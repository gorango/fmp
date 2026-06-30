#!/usr/bin/env node
import { cp, readFile, writeFile, mkdir, rm, readdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const cwd = dirname(fileURLToPath(import.meta.url))
const skillsDir = join(process.cwd(), 'skills/fmp')

async function main() {
	await mkdir(skillsDir, { recursive: true })

	const entries = await readdir(cwd, { withFileTypes: true })
	for (const entry of entries) {
		if (entry.name === 'package.json' || entry.name === 'install.mjs') continue
		const src = join(cwd, entry.name)
		const dest = join(skillsDir, entry.name)
		await rm(dest, { recursive: true, force: true })
		await cp(src, dest, { recursive: true })
	}

	// Convert README.md → SKILL.md
	const readmeDest = join(skillsDir, 'README.md')
	const skillDest = join(skillsDir, 'SKILL.md')
	let content = await readFile(readmeDest, 'utf-8')
	// Remove ## Installation block (from its heading to the next ## heading)
	content = content.replace(/^## Installation[\s\S]*?(?=^## )/m, '').trimStart()
	// Replace heading + intro with frontmatter
	content = content.replace(
		/^# FMP Skills\n\n(.+?)\n\n/,
		(_match, desc) => `---\nname: FMP Skills\ndescription: ${desc}\n---\n\n`,
	)
	await writeFile(skillDest, content, 'utf-8')
	await rm(readmeDest)

	console.log('FMP skills installed to', skillsDir)
}

main().catch((err) => {
	console.error('Install failed:', err)
	process.exit(1)
})
