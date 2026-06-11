import type { JSDoc, Type } from 'ts-morph'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { Node, Project, SymbolFlags, TypeFormatFlags } from 'ts-morph'
import { INCLUDED_API_FUNCTIONS } from './schema.include'

/**
 * Interface representing a processed parameter for Zod schema generation
 */
export interface ProcessedParameter {
	name: string
	typeScriptType: string
	zodTypeFragment: string
	description: string
}

/**
 * Interface representing a tool schema output
 */
export interface ToolSchema {
	name: string
	description: string
	parameters_schema_zod_string: string
	available_return_keys: string[]
	effective_return_item_type_name: string | undefined
	_raw_parameters: ProcessedParameter[]
}

const project = new Project()
project.addSourceFilesAtPaths(['src/api.ts', 'src/types.ts'])
const apiSourceFile = project.getSourceFileOrThrow('src/api.ts')
const processedTypes = new Map<string, string>()

/**
 * Extracts JSDoc description from a node if available
 * @param node The node to extract JSDoc description from
 * @returns The description text or undefined if not found
 */
function getJSDocDescription(node: Node): string | undefined {
	if (!Node.isJSDocable(node)) {
		return undefined
	}

	const jsDocs = node.getJsDocs()
	if (jsDocs.length === 0) {
		return undefined
	}

	return jsDocs[jsDocs.length - 1].getDescription()?.trim()
}

/**
 * Extracts parameter description from JSDoc tags
 * @param funcJsDocs Array of JSDoc comments
 * @param paramName Name of the parameter to find description for
 * @returns The parameter description or undefined if not found
 */
function getParamDescription(funcJsDocs: JSDoc[], paramName: string): string | undefined {
	for (const doc of funcJsDocs) {
		const paramTags = doc.getTags().filter((tag) => tag.getTagName() === 'param')

		for (const paramTag of paramTags) {
			const tagNameNode = (paramTag.compilerNode as any).name
			if (!tagNameNode || !tagNameNode.getText || tagNameNode.getText() !== paramName) {
				continue
			}

			const comment = paramTag.getComment()
			return typeof comment === 'string' ? comment.trim() : comment?.toString().trim()
		}
	}

	return undefined
}

/**
 * Converts a TypeScript type to an equivalent Zod schema
 * @param type The TypeScript type to convert
 * @param contextNode Node providing context for type resolution
 * @param isParamOptionalFlag Whether the parameter is marked as optional
 * @param depth Current recursion depth (for cycle detection)
 * @returns Zod schema string representation
 */
function typeToZod(type: Type, contextNode: Node, isParamOptionalFlag: boolean, depth = 0): string {
	if (depth > 10) {
		return 'z.any() /* Depth limit reached */'
	}

	const typeText = type.getText(contextNode, TypeFormatFlags.None)
	const cacheKey = `${typeText}_${isParamOptionalFlag ? 'opt' : 'req'}_${depth}`

	if (processedTypes.has(cacheKey)) {
		return processedTypes.get(cacheKey)!
	}

	let zodSchema = 'z.any()'

	if (type.isUndefined()) {
		zodSchema = 'z.undefined()'
	} else if (type.isNull()) {
		zodSchema = 'z.null()'
	} else if (type.isString() || type.isStringLiteral()) {
		zodSchema = 'z.string()'
	} else if (type.isNumber() || type.isNumberLiteral()) {
		zodSchema = 'z.number()'
	} else if (type.isBoolean() || type.isBooleanLiteral()) {
		zodSchema = 'z.boolean()'
	} else if (type.isUnion()) {
		const unionTypes = type.getUnionTypes()
		const nonUndefinedTypes = unionTypes.filter((t) => !t.isUndefined())
		const hasUndefined = unionTypes.some((t) => t.isUndefined())

		if (nonUndefinedTypes.length === 1) {
			zodSchema = typeToZod(nonUndefinedTypes[0], contextNode, false, depth + 1)
			if (
				hasUndefined &&
				!zodSchema.endsWith('.nullable()') &&
				!zodSchema.includes('.nullable()')
			) {
				zodSchema += '.nullable()'
			}
		} else if (nonUndefinedTypes.length > 0) {
			const allLiterals = nonUndefinedTypes.every((t) => t.isLiteral())

			if (allLiterals) {
				const literals = nonUndefinedTypes.map((t) =>
					t.getText(contextNode, TypeFormatFlags.UseSingleQuotesForStringLiteralType),
				)
				zodSchema = `z.enum([${literals.join(', ')}])`
			} else {
				const uniqueZodFragments = new Set(
					nonUndefinedTypes.map((t) => typeToZod(t, contextNode, false, depth + 1)),
				)
				zodSchema = `z.union([${Array.from(uniqueZodFragments).join(', ')}])`
			}

			if (
				hasUndefined &&
				!zodSchema.endsWith('.nullable()') &&
				!zodSchema.includes('.nullable()')
			) {
				zodSchema += '.nullable()'
			}
		} else {
			zodSchema = 'z.undefined()'
		}
	} else if (type.isArray()) {
		const elementType = type.getArrayElementTypeOrThrow()
		zodSchema = `z.array(${typeToZod(elementType, contextNode, false, depth + 1)})`
	} else if (type.isIntersection()) {
		const properties = type.getApparentProperties()

		if (properties.length > 0) {
			zodSchema = generateObjectSchema(properties, contextNode, depth)
		} else {
			zodSchema = 'z.any() /* Intersection type not resolvable to object */'
		}
	} else if (type.isObject() || type.isInterface()) {
		const properties = type.getApparentProperties()

		if (properties.length > 0) {
			zodSchema = generateObjectSchema(properties, contextNode, depth)
		} else {
			const stringIndexType = type.getStringIndexType()
			if (stringIndexType) {
				zodSchema = `z.record(z.string(), ${typeToZod(stringIndexType, contextNode, false, depth + 1)})`
			} else {
				const numberIndexType = type.getNumberIndexType()
				if (numberIndexType) {
					zodSchema = `z.record(z.number(), ${typeToZod(numberIndexType, contextNode, false, depth + 1)})`
				} else {
					zodSchema = 'z.object({})'
				}
			}
		}
	}

	if (isParamOptionalFlag) {
		const isAlreadyOptionalByNature =
			(type.isUnion() && type.getUnionTypes().some((t) => t.isUndefined())) || type.isUndefined()

		if (
			!isAlreadyOptionalByNature &&
			!zodSchema.endsWith('.nullable()') &&
			!zodSchema.includes('.nullable()')
		) {
			zodSchema += '.nullable()'
		}
	}

	processedTypes.set(cacheKey, zodSchema)
	return zodSchema
}

/**
 * Generates a Zod object schema from a list of properties
 * @param properties List of property symbols to include in the object
 * @param contextNode Node providing context for type resolution
 * @param depth Current recursion depth
 * @returns Zod object schema string representation
 */
function generateObjectSchema(properties: any[], contextNode: Node, depth: number): string {
	const propEntries = properties.map((propSymbol) => {
		const propName = propSymbol.getName()
		const propType = propSymbol.getTypeAtLocation(contextNode)

		if (!propType) {
			return `${propName}: z.any() /* Type resolution failed for property */`
		}

		const isPropertyOptional =
			propSymbol.hasFlags(SymbolFlags.Optional) ||
			(propType.isUnion() && propType.getUnionTypes().some((t: any) => t.isUndefined()))

		let zodPropSchemaString = typeToZod(
			propType.getNonNullableType(),
			contextNode,
			false,
			depth + 1,
		)

		if (
			isPropertyOptional &&
			!zodPropSchemaString.endsWith('.nullable()') &&
			!zodPropSchemaString.includes('.nullable()')
		) {
			zodPropSchemaString += '.nullable()'
		}

		const declarations = propSymbol.getDeclarations()
		const primaryDeclaration = declarations.length > 0 ? declarations[0] : undefined
		const propDescription = primaryDeclaration ? getJSDocDescription(primaryDeclaration) : undefined

		if (propDescription) {
			zodPropSchemaString += `.describe('${propDescription.replace(/'/g, "\\'")}')`
		}

		return `${propName}: ${zodPropSchemaString}`
	})

	return `z.object({\n\t\t\t${propEntries.join(',\n\t\t\t')},\n\t\t})`
}

/**
 * Gets a readable name for a TypeScript type
 * @param type The TypeScript type to get name for
 * @param contextNode Optional node providing context for type resolution
 * @returns The type name or undefined if not available
 */
function getTypeName(type: Type, contextNode?: Node): string | undefined {
	const symbol = type.getSymbol()
	if (symbol) {
		const aliasSymbol = type.getAliasSymbol()
		if (aliasSymbol) {
			return aliasSymbol.getName()
		}
		return symbol.getName()
	}

	if (type.isObject()) {
		return 'object'
	}

	return type.getText(contextNode)
}

/**
 * Extracts the effective return type name from a function return type
 * @param funcReturnType The function's return type
 * @param contextNode Node providing context for type resolution
 * @returns The effective return type name or undefined
 */
function getEffectiveReturnItemTypeName(
	funcReturnType: Type,
	contextNode: Node,
): string | undefined {
	let currentType = funcReturnType

	if (currentType.isObject() && currentType.getTargetType()?.getSymbol()?.getName() === 'Promise') {
		const typeArgs = currentType.getTypeArguments()
		currentType = typeArgs.length > 0 ? typeArgs[0] : currentType.getConstraint() || currentType

		if (!typeArgs.length && !currentType.getConstraint()) {
			return 'any'
		}
	}

	currentType = currentType.getNonNullableType()

	let itemType = currentType
	if (currentType.isArray()) {
		const arrayElementType = currentType.getArrayElementTypeOrThrow()
		itemType = arrayElementType.getNonNullableType()
	}

	let name = getTypeName(itemType, contextNode)

	if (name && itemType.getText(contextNode, TypeFormatFlags.None).startsWith('FMPTypes.')) {
		name = itemType.getText(contextNode, TypeFormatFlags.None).substring('FMPTypes.'.length)
	}

	if (name === 'Array' || name === 'Promise' || name === '__object') {
		return 'object'
	}

	return name
}

/**
 * Builds tool schemas from exported functions in the API file
 * @returns Array of tool schema objects
 */
export function buildToolSchemas(includeAll: boolean = false): ToolSchema[] {
	processedTypes.clear()

	return apiSourceFile
		.getFunctions()
		.filter((func) => {
			const functionName = func.getName()
			const isExported = func.isExported()
			return functionName && isExported && (includeAll || INCLUDED_API_FUNCTIONS.has(functionName))
		})
		.map((func) => {
			const name = func.getNameOrThrow()
			const jsDocs = func.getJsDocs()
			const description = getJSDocDescription(func) || `Tool to call endpoint: ${name}`

			const rawParameters = func.getParameters().map((param) => {
				const paramName = param.getName()
				const paramType = param.getType()
				const contextNode = param

				const isParamOptional =
					param.isOptional() ||
					param.hasInitializer() ||
					(paramType.isUnion() && paramType.getUnionTypes().some((t) => t.isUndefined()))

				const paramZodSchemaItself = typeToZod(paramType, contextNode, isParamOptional, 0)
				const paramDescriptionText =
					getParamDescription(jsDocs, paramName) || `Parameter ${paramName}`

				return {
					name: paramName,
					typeScriptType: param.getTypeNode()?.getText() || paramType.getText(contextNode),
					zodTypeFragment: `${paramName}: ${paramZodSchemaItself}.describe('${paramDescriptionText.replace(/'/g, "\\'")}')`,
					description: paramDescriptionText,
				}
			})

			const funcReturnType = func.getReturnType()
			const effectiveReturnTypeName = getEffectiveReturnItemTypeName(funcReturnType, func)

			let effectiveItemTypeForKeys = funcReturnType
			if (
				funcReturnType.isObject() &&
				funcReturnType.getTargetType()?.getSymbol()?.getName() === 'Promise'
			) {
				const typeArgs = funcReturnType.getTypeArguments()
				if (typeArgs.length > 0) {
					effectiveItemTypeForKeys = typeArgs[0]
				}
			}
			effectiveItemTypeForKeys = effectiveItemTypeForKeys.getNonNullableType()
			if (effectiveItemTypeForKeys.isArray()) {
				effectiveItemTypeForKeys = effectiveItemTypeForKeys
					.getArrayElementTypeOrThrow()
					.getNonNullableType()
			}

			const availableReturnKeys =
				effectiveItemTypeForKeys.isObject() || effectiveItemTypeForKeys.isInterface()
					? effectiveItemTypeForKeys.getApparentProperties().map((p) => p.getName())
					: []

			const parameterZodEntries = rawParameters.map((p) => p.zodTypeFragment)
			if (availableReturnKeys.length > 0) {
				const keysEnum = `z.enum([${availableReturnKeys.map((k) => `'${k.replace(/'/g, "\\'")}'`).join(', ')}])`
				const valuesParamZod = `values: z.array(${keysEnum}).nullable().describe('Specific fields to return from the result. Available fields: ${availableReturnKeys.join(', ')}')`
				parameterZodEntries.push(valuesParamZod)
			}

			const fullParametersZodString =
				parameterZodEntries.length > 0
					? `z.object({ ${parameterZodEntries.join(',\n\t\t')} })`
					: 'z.object({})'

			return {
				name,
				description,
				parameters_schema_zod_string: fullParametersZodString,
				available_return_keys: availableReturnKeys,
				effective_return_item_type_name: effectiveReturnTypeName,
				_raw_parameters: rawParameters,
			}
		})
}

async function main() {
	const toolSchemas = buildToolSchemas()
	console.log(JSON.stringify(toolSchemas, null, 2))
}

const __filename = fileURLToPath(import.meta.url)

if (process.argv[1] === __filename) {
	main()
}
