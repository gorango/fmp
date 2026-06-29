import type { ToolSchema } from './schema'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { buildToolSchemas } from './schema'

const EXPORT_FILE_PATH = path.join(process.cwd(), '../sdk/src/constants', 'returns.ts')

function generateReturnsFileContent(schemas: ToolSchema[]): string {
	const lines: string[] = [
		"import type * as api from '../api.js'",
		'',
		'type ApiFunctionNames = {',
		'\t[K in keyof typeof api]: (typeof api)[K] extends (...args: any[]) => any ? K : never',
		'}[keyof typeof api]',
		'',
	]

	const entries: string[] = []

	for (const schema of schemas) {
		if (!schema.available_return_keys || schema.available_return_keys.length === 0) {
			continue
		}

		const keys = schema.available_return_keys.map((k) => `'${k}'`).join(', ')
		lines.push(`const ${schema.name} = [${keys}] as const`)
		lines.push('')
		entries.push(schema.name)
	}

	lines.push('export const returns: Partial<Record<ApiFunctionNames, readonly string[]>> = {')
	for (const name of entries) {
		lines.push(`\t${name},`)
	}
	lines.push('}')

	return lines.join('\n')
}

async function main() {
	try {
		const schemas = buildToolSchemas()
		const content = generateReturnsFileContent(schemas)
		fs.mkdirSync(path.dirname(EXPORT_FILE_PATH), { recursive: true })
		fs.writeFileSync(EXPORT_FILE_PATH, content)
		const count = schemas.filter((s) => s.available_return_keys.length > 0).length
		console.log(`Successfully generated returns.ts with ${count} entries.`)
	} catch (error) {
		console.error('Error generating returns:')
		if (error instanceof Error) {
			console.error(`\t${error.message}`)
			if (error.stack) {
				console.error(error.stack)
			}
		} else {
			console.error(error)
		}
		process.exit(1)
	}
}

main()
