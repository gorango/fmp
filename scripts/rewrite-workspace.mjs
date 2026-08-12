import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const rootPkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const dirs = rootPkg.workspaces.flatMap((w) =>
	w.endsWith('/*')
		? readdirSync(join(root, w.slice(0, -2))).map((d) => `${w.slice(0, -2)}/${d}`)
		: [w],
)

const versions = {}
for (const dir of dirs) {
	const p = join(root, dir, 'package.json')
	if (!existsSync(p)) continue
	const pkg = JSON.parse(readFileSync(p, 'utf8'))
	if (pkg.name) versions[pkg.name] = pkg.version
}

for (const dir of dirs) {
	const p = join(root, dir, 'package.json')
	if (!existsSync(p)) continue
	const pkg = JSON.parse(readFileSync(p, 'utf8'))
	if (pkg.private) continue
	let touched = false
	for (const block of [
		'dependencies',
		'devDependencies',
		'peerDependencies',
		'optionalDependencies',
	]) {
		if (!pkg[block]) continue
		for (const [dep, spec] of Object.entries(pkg[block])) {
			if (typeof spec !== 'string' || !spec.startsWith('workspace:')) continue
			if (!versions[dep])
				throw new Error(`No workspace version known for ${dep} (dep of ${pkg.name})`)
			const range = spec.slice('workspace:'.length)
			pkg[block][dep] =
				{
					'': versions[dep],
					'*': versions[dep],
					'^': `^${versions[dep]}`,
					'~': `~${versions[dep]}`,
				}[range] ?? range
			touched = true
		}
	}
	if (touched) {
		writeFileSync(p, JSON.stringify(pkg, null, '\t') + '\n')
		console.log(`rewrote ${pkg.name}`)
	}
}
