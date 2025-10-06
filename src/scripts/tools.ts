import type { ToolSchema } from './schema'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { buildToolSchemas } from './schema'

// Path to the generated output file
const EXPORT_FILE_PATH = path.join(process.cwd(), 'src/generated', 'tools.ts')

/**
 * Converts camelCase to SNAKE_UPPER_CASE for constant naming
 *
 * @example
 * camelToSnakeUpperCase('searchSymbol') // returns 'SEARCH_SYMBOL'
 */
function camelToSnakeUpperCase(str: string): string {
	return str.replace(/([A-Z])/g, '_$1').toUpperCase()
}

/**
 * Generates constants for the return value types
 *
 * @param schema Tool schema containing available return keys
 * @returns String containing the constant declaration or empty string if no keys available
 */
function generateValueConstants(schema: ToolSchema): string {
	if (!schema.available_return_keys || schema.available_return_keys.length === 0) {
		return ''
	}

	const constName = `${camelToSnakeUpperCase(schema.name)}_RESULT_VALUES`
	const values = schema.available_return_keys.map((key: string) => `'${key}'`).join(', ')

	return `const ${constName} = [${values}] as const`
	// return `const ${constName} = [${values}] as (keyof FMPTypes.${fmpTypeName})[]`
}

/**
 * Prepares parameters for the z.object schema in the tool definition
 *
 * @param schema Tool schema containing raw parameters and available return keys
 * @returns String containing the Zod object parameters
 */
function prepareToolParametersZod(schema: ToolSchema): string {
	const toolParams: string[] = []

	// Add all raw parameters
	schema._raw_parameters.forEach((param) => {
		toolParams.push(param.zodTypeFragment)
	})

	// Add values parameter if fields are available for selection
	if (schema.available_return_keys && schema.available_return_keys.length > 0) {
		const constName = `${camelToSnakeUpperCase(schema.name)}_RESULT_VALUES`
		toolParams.push(
			`values: z.array(z.enum(${constName})).nullable().describe('Specific fields to return from the results.')`,
		)
	}

	return toolParams.join(',\n\t\t')
}

/**
 * Determines how parameters are passed to the FMP SDK function in the execute block
 *
 * @param schema Tool schema containing raw parameters
 * @returns Comma-separated list of argument names
 */
function getSdkCallArgs(schema: ToolSchema): string {
	return schema._raw_parameters.map(param => param.name).join(', ')
}

/**
 * Creates the destructuring pattern for the execute function's arguments
 *
 * @param schema Tool schema containing raw parameters and available return keys
 * @returns Destructuring pattern string or empty string if no parameters
 */
function getExecuteDestructuredArgs(schema: ToolSchema): string {
	const executeArgNames = schema._raw_parameters.map(p => p.name)

	if (schema.available_return_keys && schema.available_return_keys.length > 0) {
		executeArgNames.push('values')
	}

	if (executeArgNames.length === 0) {
		return ''
	}

	return `{ ${executeArgNames.join(', ')} }`
}

/**
 * Generates the execute function block based on the schema
 *
 * @param schema Tool schema
 * @returns String containing the execute function implementation
 */
function generateExecuteFunction(schema: ToolSchema): string {
	const executeDestructuredArgs = getExecuteDestructuredArgs(schema)
	const sdkCallArgs = getSdkCallArgs(schema)
	const functionName = schema.name

	// Handle case where result field selection is available
	if (schema.available_return_keys && schema.available_return_keys.length > 0) {
		return `
	execute: async (${executeDestructuredArgs}) => {
		try {
			const results = await fmp.${functionName}(${sdkCallArgs})
			return applyFieldSelection(results, values)
		}
		catch (error: any) {
			console.error('Error in ${functionName}Tool:', error)
			return { result: error.message || 'An unexpected error occurred in ${functionName}Tool', isError: true }
		}
	},`
	}

	// Handle case with no parameters
	if (sdkCallArgs === '' && executeDestructuredArgs === '') {
		return `
	execute: async () => {
		return fmp.${functionName}()
	},`
	}

	// Standard case with parameters but no field selection
	return `
	execute: async (${executeDestructuredArgs}) => {
		return fmp.${functionName}(${sdkCallArgs})
	},`
}

/**
 * Generates a complete tool definition from a schema
 *
 * @param schema Tool schema
 * @returns String containing the tool definition
 */
function generateTool(schema: ToolSchema): string {
	const functionName = schema.name
	const description = schema.description.replace(/'/g, '\\\'') // Escape single quotes

	const valueConstants = generateValueConstants(schema)
	const toolParamsZodContent = prepareToolParametersZod(schema)
	const executeFunctionBlock = generateExecuteFunction(schema)

	return `${valueConstants ? `\n${valueConstants}` : ''}
export const ${functionName} = tool({
	description: '${description}',
	inputSchema: z.object({
		${toolParamsZodContent},
	}),${executeFunctionBlock}
})
`
}

/**
 * Generates the imports section for the tools file
 *
 * @returns String containing the imports and utility functions
 */
function generateImports(): string {
	return `import { tool } from 'ai'
import { z } from 'zod'
import * as fmp from '../api.js'

/**
 * Applies field selection to a data object or array of objects
 *
 * @param data The data to filter fields from
 * @param fieldsToSelect Optional array of field names to select
 * @returns Filtered data containing only the selected fields
 */
export function applyFieldSelection<T extends Record<string, any>>(
	data: T[] | T,
	fieldsToSelect?: readonly (keyof T)[] | null,
): Partial<T>[] | Partial<T> {
	if (!fieldsToSelect || fieldsToSelect.length === 0) {
		return data
	}

	const alwaysIncludeKeys = ['symbol', 'year', 'date'] as const

	const selectFields = (item: T): Partial<T> => {
		const result: Record<string, any> = {}

		for (const requestedKey of fieldsToSelect) {
			if (Object.prototype.hasOwnProperty.call(item, requestedKey)) {
				result[requestedKey as string] = item[requestedKey]
			}
			if ('data' in item && Object.prototype.hasOwnProperty.call(item.data, requestedKey)) {
				result[requestedKey as string] = item[requestedKey]
			}
		}

		for (const mandatoryKey of alwaysIncludeKeys) {
			if (Object.prototype.hasOwnProperty.call(item, mandatoryKey)) {
				result[mandatoryKey] = (item as Record<string, any>)[mandatoryKey]
			}
			if ('data' in item && Object.prototype.hasOwnProperty.call(item.data, mandatoryKey)) {
				result[mandatoryKey] = (item as Record<string, any>)[mandatoryKey]
			}
		}

		return result as Partial<T>
	}

	if (Array.isArray(data)) {
		return data.map(item => selectFields(item))
	}
	if (data && typeof data === 'object') {
		return selectFields(data)
	}

	return data
}
`
}

/**
 * Generates the exports section for the tools file
 *
 * @param schemas Array of tool schemas
 * @returns String containing the exports
 */
function generateExports(schemas: ToolSchema[]): string {
	const toolNames = schemas.map(s => s.name)

	return `
export const tools = {
${toolNames.map(name => `\t${name},`).join('\n')}
}

export default tools
`
}

/**
 * Generates the complete tools file
 *
 * @param schemas Array of tool schemas
 * @returns String containing the entire file content
 */
function generateToolsFile(schemas: ToolSchema[]): string {
	// Build the file in sections
	let fileContent = generateImports()

	// Add each tool definition
	schemas.forEach((schema) => {
		fileContent += generateTool(schema)
	})

	// Add exports
	fileContent += generateExports(schemas)

	return fileContent
}

/**
 * Main function to generate the tools file
 */
async function main() {
	try {
		const schemas = buildToolSchemas()
		const toolsFileContent = generateToolsFile(schemas)
		fs.writeFileSync(EXPORT_FILE_PATH, toolsFileContent)
		console.log(`Successfully generated tools.ts with ${schemas.length} tools.`)
	}
	catch (error) {
		console.error('Error generating tools:')
		if (error instanceof Error) {
			console.error(`	${error.message}`)
			if (error.stack) {
				console.error(error.stack)
			}
		}
		else {
			console.error(error)
		}
		process.exit(1)
	}
}

// Run the generator
main()
