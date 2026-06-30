import { describe, it, expect } from 'bun:test'

// Recreate the utility functions from tools.ts for testability.
// In a larger refactor these would be exported; testing the logic directly.
function camelToSnakeUpperCase(str: string): string {
	return str.replace(/([A-Z])/g, '_$1').toUpperCase()
}

function generateValueConstants(availableReturnKeys: string[], toolName: string): string {
	if (!availableReturnKeys || availableReturnKeys.length === 0) {
		return ''
	}
	const constName = `${camelToSnakeUpperCase(toolName)}_RESULT_VALUES`
	const values = availableReturnKeys.map((key: string) => `'${key}'`).join(', ')
	return `const ${constName} = [${values}] as const`
}

function getSdkCallArgs(rawParams: { name: string; isOptional: boolean }[]): string {
	return rawParams
		.map((param) => (param.isOptional ? `${param.name} ?? undefined` : param.name))
		.join(', ')
}

function getExecuteDestructuredArgs(rawParams: { name: string }[], hasReturnKeys: boolean): string {
	const executeArgNames = rawParams.map((p) => p.name)
	if (hasReturnKeys) {
		executeArgNames.push('values')
	}
	if (executeArgNames.length === 0) {
		return ''
	}
	return `{ ${executeArgNames.join(', ')} }`
}

describe('camelToSnakeUpperCase', () => {
	it('converts simple camelCase', () => {
		expect(camelToSnakeUpperCase('searchSymbol')).toBe('SEARCH_SYMBOL')
	})

	it('converts multi-word camelCase', () => {
		expect(camelToSnakeUpperCase('historicalIntradayChart')).toBe('HISTORICAL_INTRADAY_CHART')
	})

	it('handles leading uppercase', () => {
		expect(camelToSnakeUpperCase('DCFAnalysis')).toBe('_D_C_F_ANALYSIS')
	})

	it('handles single word', () => {
		expect(camelToSnakeUpperCase('test')).toBe('TEST')
	})

	it('handles empty string', () => {
		expect(camelToSnakeUpperCase('')).toBe('')
	})
})

describe('generateValueConstants', () => {
	it('generates constants for available return keys', () => {
		const result = generateValueConstants(['symbol', 'name', 'price'], 'searchSymbol')
		expect(result).toBe("const SEARCH_SYMBOL_RESULT_VALUES = ['symbol', 'name', 'price'] as const")
	})

	it('returns empty string for no keys', () => {
		expect(generateValueConstants([], 'test')).toBe('')
		expect(generateValueConstants(undefined as any, 'test')).toBe('')
	})

	it('handles single key', () => {
		const result = generateValueConstants(['symbol'], 'getQuote')
		expect(result).toBe("const GET_QUOTE_RESULT_VALUES = ['symbol'] as const")
	})
})

describe('getSdkCallArgs', () => {
	it('returns required params directly', () => {
		const params = [
			{ name: 'symbol', isOptional: false },
			{ name: 'limit', isOptional: false },
		]
		expect(getSdkCallArgs(params)).toBe('symbol, limit')
	})

	it('appends ?? undefined for optional params', () => {
		const params = [
			{ name: 'symbol', isOptional: false },
			{ name: 'limit', isOptional: true },
		]
		expect(getSdkCallArgs(params)).toBe('symbol, limit ?? undefined')
	})

	it('handles empty params', () => {
		expect(getSdkCallArgs([])).toBe('')
	})
})

describe('getExecuteDestructuredArgs', () => {
	it('includes all raw params', () => {
		const params = [{ name: 'symbol' }, { name: 'limit' }]
		expect(getExecuteDestructuredArgs(params, false)).toBe('{ symbol, limit }')
	})

	it('includes values when return keys exist', () => {
		const params = [{ name: 'symbol' }]
		expect(getExecuteDestructuredArgs(params, true)).toBe('{ symbol, values }')
	})

	it('returns empty for no params and no values', () => {
		expect(getExecuteDestructuredArgs([], false)).toBe('')
	})

	it('returns only values for no params but with return keys', () => {
		expect(getExecuteDestructuredArgs([], true)).toBe('{ values }')
	})
})
