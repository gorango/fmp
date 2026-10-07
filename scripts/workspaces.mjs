import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Discovers every workspace member from the root package.json `workspaces` globs.
 * Returns manifests in declaration order so callers behave identically to npm/bun.
 */
export function readWorkspacePackages(root = process.cwd()) {
	const rootPkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
	const dirs = (rootPkg.workspaces ?? []).flatMap((glob) =>
		glob.endsWith('/*')
			? readdirSync(join(root, glob.slice(0, -2))).map((d) => `${glob.slice(0, -2)}/${d}`)
			: [glob],
	)

	const packages = []
	for (const dir of dirs) {
		const path = join(root, dir, 'package.json')
		if (!existsSync(path)) continue
		packages.push({ dir, path, manifest: JSON.parse(readFileSync(path, 'utf8')) })
	}
	return packages
}

export const isPublishable = (pkg) => pkg.manifest.private !== true
