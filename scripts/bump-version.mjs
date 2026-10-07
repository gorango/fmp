import { readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { readWorkspacePackages, isPublishable } from './workspaces.mjs'

const SEMVER = /^(\d+)\.(\d+)\.(\d+)(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/

const fail = (msg) => {
	console.error(`::error::${msg}`)
	process.exit(1)
}

const [target, ...flags] = process.argv.slice(2)
const dryRun = flags.includes('--dry-run')

if (!target) fail('usage: node scripts/bump-version.mjs <version> [--dry-run]')

const parsed = SEMVER.exec(target)
if (!parsed) fail(`"${target}" is not a valid semver version (expected e.g. 1.0.3 or 1.0.3-beta.1)`)

const root = process.cwd()
const git = (...args) => spawnSync('git', args, { cwd: root, stdio: 'inherit' })
const gitOut = (...args) => spawnSync('git', args, { cwd: root, encoding: 'utf8' }).stdout.trim()

const packages = readWorkspacePackages(root)
const publishable = packages.filter(isPublishable)

if (publishable.length === 0) fail('no publishable workspaces found')

// Lockstep invariant: every publishable package ships at the same version, so a
// consumer of cli@X always resolves mcp@X / tools@X / sdk@X.
const versions = new Set(publishable.map((p) => p.manifest.version))
if (versions.size > 1) {
	fail(
		`publishable packages are out of sync: ${publishable
			.map((p) => `${p.manifest.name}@${p.manifest.version}`)
			.join(', ')}`,
	)
}

const current = publishable[0].manifest.version
const from = SEMVER.exec(current)
const order = [Number(from[1]), Number(from[2]), Number(from[3])]
const next = [Number(parsed[1]), Number(parsed[2]), Number(parsed[3])]
if (next.some((n, i) => n < order[i]) && next.every((n, i) => n <= order[i])) {
	fail(`refusing to move publishable packages backwards: ${current} -> ${target}`)
}

const tag = `v${target}`
if (gitOut('rev-parse', '-q', '--verify', `refs/tags/${tag}`)) fail(`tag ${tag} already exists`)

// Only bump files that are already committed, otherwise the release commit would
// silently sweep up unrelated in-progress edits to a package.json.
const lockPath = join(root, 'bun.lock')
const files = [...publishable.map((p) => p.path), lockPath]
const dirty = gitOut('status', '--porcelain', '--', ...files)
if (dirty) {
	fail(`bump files have uncommitted changes — commit or stash first:\n${dirty}`)
}

const skipped = packages.filter((p) => !isPublishable(p)).map((p) => p.manifest.name)
console.log(`bumping ${publishable.length} packages: ${current} -> ${target}`)
if (skipped.length > 0) console.log(`skipping private: ${skipped.join(', ')}`)

if (dryRun) {
	console.log(`\ndry run — would not write, commit or tag ${tag}`)
	process.exit(0)
}

for (const pkg of publishable) {
	pkg.manifest.version = target
	writeFileSync(pkg.path, JSON.stringify(pkg.manifest, null, '\t') + '\n')
}

// bun does not refresh workspace versions in bun.lock (#28935 / #18906), and a
// stale lock makes `bun install --frozen-lockfile` drift on the next release.
let lock = readFileSync(lockPath, 'utf8')
for (const pkg of publishable) {
	const escaped = pkg.dir.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	const re = new RegExp(`("${escaped}"\\s*:\\s*\\{[^{}]*?"version"\\s*:\\s*)"[^"]*"`)
	if (!re.test(lock)) fail(`could not find "${pkg.dir}" version entry in bun.lock`)
	lock = lock.replace(re, `$1"${target}"`)
}
writeFileSync(lockPath, lock)

const check = spawnSync('bun', ['install', '--frozen-lockfile'], { cwd: root, stdio: 'inherit' })
if (check.status !== 0) fail('bun install --frozen-lockfile failed — bun.lock is inconsistent')

git('add', ...files)
git('commit', '-m', `chore(release): bump packages to ${target}`)
git('tag', '-a', tag, '-m', `chore(release): bump packages to ${target}`)

console.log(`
committed and tagged ${tag} — push when ready:
  git push --follow-tags
`)
