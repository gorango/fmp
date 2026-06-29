import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { buildToolSchemas } from './schema'

const EXPORT_FILE_PATH = path.join(process.cwd(), '../tools/src', 'docs.json')
const MAX_RETURN_KEYS = 64

export interface ToolDoc {
	tool_name: string
	description: string
	parameters_summary: string
	return_keys_summary: string
	// adding keywords later, by LLM enrichment
}

/**
 * Parses a Zod object string to extract sub-parameters
 * @param zodObjectString String representation of a z.object's properties
 * @returns Formatted string of the object's properties
 */
function extractSubParameters(zodObjectString: string): string {
	const objectContentMatch = zodObjectString.match(/z\.object\(\s*\{([\s\S]*?)\}\s*\)/)
	if (!objectContentMatch || !objectContentMatch[1]) {
		return '(object)' // Fallback if parsing fails
	}

	const propertiesString = objectContentMatch[1]
	const subParams: string[] = []

	const propRegex =
		/(\w+)\s*:\s*z\.\w+\(?[^)]*?\)?(?:\.optional\(\))?(?:\.describe\(['"].*?['"]\))?/g
	let match: RegExpExecArray | null

	// eslint-disable-next-line no-cond-assign
	while ((match = propRegex.exec(propertiesString)) !== null) {
		const fieldName = match[1]
		subParams.push(fieldName)
	}

	if (subParams.length > 0) {
		return `(${subParams.join(', ')})`
	}
	return '(object)'
}

/**
 * Extracts values from a Zod enum string
 * @param zodEnumString String representation of a z.enum
 * @returns Formatted string of enum values
 */
function extractEnumValues(zodEnumString: string): string {
	const enumMatch = zodEnumString.match(/z\.enum\(\s*\[(.*?)\]\s*\)/)
	if (enumMatch && enumMatch[1]) {
		const values = enumMatch[1].split(',').map((v) => v.trim().replace(/^['"]|['"]$/g, ''))

		if (values.length > 0) {
			return `(${values.join(', ')})`
		}
	}
	return ''
}

/**
 * Formats parameters into a human-readable string
 * @param rawParams Array of parameter objects
 * @returns Formatted parameter summary string
 */
function formatParameters(rawParams: any[]): string {
	if (!rawParams || rawParams.length === 0) {
		return 'No parameters.'
	}

	return rawParams
		.map((param) => {
			if (param.zodTypeFragment.startsWith(`${param.name}: z.object`)) {
				const subParamsSummary = extractSubParameters(param.zodTypeFragment)
				return `${param.name} ${subParamsSummary}`
			}

			const typeMatch = param.zodTypeFragment.match(/:\s*z\.(\w+)/)
			let baseType = typeMatch ? typeMatch[1] : param.typeScriptType.split(':')[0].trim()

			if (param.zodTypeFragment.includes('string')) {
				baseType = ``
			} else if (param.zodTypeFragment.includes('z.array(')) {
				baseType = ` array of ${baseType}`
			} else if (param.zodTypeFragment.includes('z.enum(')) {
				const enumSummary = extractEnumValues(param.zodTypeFragment)
				baseType = ` enum ${enumSummary}`
			} else if (param.zodTypeFragment.includes('z.union(')) {
				baseType = ` union`
			}

			return `${param.name}${baseType}`
		})
		.join('; ')
}

/**
 * Formats return keys into a human-readable string
 * @param keys Array of return key strings
 * @returns Formatted return keys summary
 */
function formatReturnKeys(keys: string[]): string {
	if (!keys || keys.length === 0) {
		return 'No specific return fields selectable, returns full object/array.'
	}

	if (keys.length <= MAX_RETURN_KEYS) {
		return keys.join(', ')
	} else {
		const representativeKeys = keys.slice(0, MAX_RETURN_KEYS)
		return `${representativeKeys.join(', ')}, and ${keys.length - MAX_RETURN_KEYS} more. Refer to tool schema for full list.`
	}
}

/**
 * Generates tool documentation from schemas and saves to a JSON file
 */
async function generateToolDocumentation() {
	try {
		const schemas = buildToolSchemas()

		const toolDocs: ToolDoc[] = schemas.map((schema) => ({
			tool_name: schema.name,
			description: schema.description,
			parameters_summary: formatParameters(schema._raw_parameters),
			return_keys_summary: formatReturnKeys(schema.available_return_keys),
		}))

		fs.mkdirSync(path.dirname(EXPORT_FILE_PATH), { recursive: true })
		fs.writeFileSync(EXPORT_FILE_PATH, JSON.stringify(toolDocs, null, '\t'))
		console.log(
			`Successfully generated ${EXPORT_FILE_PATH} with ${toolDocs.length} tool documents.`,
		)
	} catch (error) {
		console.error('Error generating tool documentation:', error)
		if (error instanceof Error && error.stack) {
			console.error(error.stack)
		}
	}
}

generateToolDocumentation()
