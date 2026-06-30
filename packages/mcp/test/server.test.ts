import { describe, it, expect } from 'bun:test'
import { spawn, type ChildProcess } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { once } from 'node:events'

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

const FMP_KEY = process.env.FMP_KEY
const REDIS_URL = process.env.REDIS_URL
const canRun = !!FMP_KEY

const describeIf = (condition: boolean, title: string, fn: () => void) => {
	if (condition) describe(title, fn)
	else describe.skip(title, fn)
}

async function withServer<T>(fn: (server: ChildProcess) => Promise<T>): Promise<T> {
	const server = spawn('bun', ['run', 'src/index.ts'], {
		cwd: packageRoot,
		env: { FMP_KEY, REDIS_URL: REDIS_URL ?? '', PATH: process.env.PATH },
		stdio: ['pipe', 'pipe', 'inherit'],
	})

	let timeout: ReturnType<typeof setTimeout>

	try {
		const result = await Promise.race([
			fn(server),
			new Promise<never>((_, reject) => {
				timeout = setTimeout(() => reject(new Error('Server test timed out')), 10_000)
			}),
		])
		return result
	} finally {
		clearTimeout(timeout!)
		server.stdin?.end()
		server.kill('SIGTERM')
		if (server.exitCode === null) {
			await once(server, 'exit')
		}
	}
}

function request(server: ChildProcess, method: string, params: unknown = {}): Promise<any> {
	return new Promise<any>((resolve, reject) => {
		const msg = JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }) + '\n'
		const chunks: Buffer[] = []

		const onData = (data: Buffer) => {
			chunks.push(data)
			const combined = Buffer.concat(chunks).toString()
			try {
				resolve(JSON.parse(combined))
				server.stdout?.removeListener('data', onData)
			} catch {}
		}

		const onError = (err: Error) => {
			server.stdout?.removeListener('data', onData)
			reject(err)
		}

		const onClose = () => {
			server.stdout?.removeListener('data', onData)
			reject(new Error('Server closed before response'))
		}

		server.stdout?.on('data', onData)
		server.stdout?.on('error', onError)
		server.stdout?.on('end', onClose)
		server.stdin?.write(msg)
	})
}

describeIf(canRun, 'fmp-mcp server', () => {
	it('lists all tools', async () => {
		await withServer(async (server) => {
			const res = await request(server, 'tools/list')
			expect(res.result).toBeDefined()
			expect(Array.isArray(res.result.tools)).toBe(true)
			expect(res.result.tools.length).toBeGreaterThan(50)

			const names = res.result.tools.map((t: any) => t.name)
			expect(names).toContain('searchSymbol')
			expect(names).toContain('companyProfile')
			expect(names).toContain('incomeStatement')
		})
	})

	it('calls a tool and returns a result', async () => {
		await withServer(async (server) => {
			const res = await request(server, 'tools/call', {
				name: 'searchSymbol',
				arguments: { query: 'AAPL' },
			})

			expect(res.result).toBeDefined()
			expect(res.result.content).toBeDefined()
			expect(res.result.content[0].type).toBe('text')
			const data = JSON.parse(res.result.content[0].text)
			expect(Array.isArray(data)).toBe(true)
			expect(data[0].symbol).toBe('AAPL')
		})
	})
})
