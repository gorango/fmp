#!/usr/bin/env node
import { cp, mkdir, rm, readdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const cwd = dirname(fileURLToPath(import.meta.url))
const skillsDir = join(process.cwd(), 'skills/fmp')

async function main() {
	await mkdir(skillsDir, { recursive: true })

	const entries = await readdir(cwd, { withFileTypes: true })
	const ignoreEntries = ['README.md', 'package.json', 'install.mjs']
	for (const entry of entries) {
		if (ignoreEntries.some((e) => e === entry.name)) continue
		const src = join(cwd, entry.name)
		const dest = join(skillsDir, entry.name)
		await rm(dest, { recursive: true, force: true })
		await cp(src, dest, { recursive: true, dereference: true })
	}

	console.log('FMP skills installed to', skillsDir)
}

main().catch((err) => {
	console.error('Install failed:', err)
	process.exit(1)
})
