import { spawn, type ChildProcess } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

const FMP_KEY = process.env.FMP_KEY
const REDIS_URL = process.env.REDIS_URL
const canRun = !!FMP_KEY

const describeIf = (condition: boolean, title: string, fn: () => void) => {
	if (condition) describe(title, fn)
	else describe.skip(title, fn)
}

function request(server: ChildProcess, method: string, params: unknown = {}) {
	return new Promise<any>((resolve, reject) => {
		const msg = JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }) + '\n'
		let buffer = ''

		const onData = (data: Buffer) => {
			buffer += data.toString()
			try {
				resolve(JSON.parse(buffer))
				server.stdout?.removeListener('data', onData)
			} catch {}
		}

		server.stdout?.on('data', onData)
		server.stdin?.write(msg)
		setTimeout(() => {
			server.stdout?.removeListener('data', onData)
			reject(new Error('Timeout waiting for response'))
		}, 5_000)
	})
}

describeIf(canRun, 'fmp-mcp server', () => {
	it('lists all tools', async () => {
		const server = spawn('bun', ['run', 'src/index.ts'], {
			cwd: packageRoot,
			env: { FMP_KEY, REDIS_URL: REDIS_URL ?? '', PATH: process.env.PATH },
			stdio: ['pipe', 'pipe', 'inherit'],
		})

		try {
			const res = await request(server, 'tools/list')
			expect(res.result).toBeDefined()
			expect(Array.isArray(res.result.tools)).toBe(true)
			expect(res.result.tools.length).toBeGreaterThan(50)

			const names = res.result.tools.map((t: any) => t.name)
			expect(names).toContain('searchSymbol')
			expect(names).toContain('companyProfile')
			expect(names).toContain('incomeStatement')
		} finally {
			server.kill()
		}
	})

	it('calls a tool and returns a result', async () => {
		const server = spawn('bun', ['run', 'src/index.ts'], {
			cwd: packageRoot,
			env: { FMP_KEY, REDIS_URL: REDIS_URL ?? '', PATH: process.env.PATH },
			stdio: ['pipe', 'pipe', 'inherit'],
		})

		try {
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
		} finally {
			server.kill()
		}
	})
})
