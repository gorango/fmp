import { writeFileSync } from 'node:fs'
import { readWorkspacePackages, isPublishable } from './workspaces.mjs'

const packages = readWorkspacePackages()

// Internal deps are published as `workspace:*` in source, which npm does not
// rewrite when packing — pin them to the sibling's version so consumers get an
// installable tarball. Runs on the CI runner's throwaway checkout.
const versions = {}
for (const pkg of packages) {
	if (pkg.manifest.name) versions[pkg.manifest.name] = pkg.manifest.version
}

for (const pkg of packages) {
	if (!isPublishable(pkg)) continue
	const manifest = pkg.manifest
	let touched = false
	for (const block of [
		'dependencies',
		'devDependencies',
		'peerDependencies',
		'optionalDependencies',
	]) {
		if (!manifest[block]) continue
		for (const [dep, spec] of Object.entries(manifest[block])) {
			if (typeof spec !== 'string' || !spec.startsWith('workspace:')) continue
			if (!versions[dep])
				throw new Error(`No workspace version known for ${dep} (dep of ${manifest.name})`)
			const range = spec.slice('workspace:'.length)
			manifest[block][dep] =
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
		writeFileSync(pkg.path, JSON.stringify(manifest, null, '\t') + '\n')
		console.log(`rewrote ${manifest.name}`)
	}
}
