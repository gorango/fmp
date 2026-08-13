import { describe, it, expect } from 'bun:test'
import { csvToJson } from '../src/utils/csv'
import { cleanQuery } from '../src/utils/fmp-ky'
import { uppercaseSymbolParams } from '../src/utils/fmp-hooks'

describe('cleanQuery', () => {
	it('strips null and undefined values', () => {
		const result = cleanQuery({ a: 'hello', b: null, c: undefined, d: 42 })
		expect(result).toEqual({ a: 'hello', d: 42 })
	})

	it('joins arrays with commas', () => {
		const result = cleanQuery({ symbols: ['AAPL', 'MSFT', 'GOOGL'] })
		expect(result).toEqual({ symbols: 'AAPL,MSFT,GOOGL' })
	})

	it('returns empty object for empty input', () => {
		expect(cleanQuery({})).toEqual({})
		expect(cleanQuery()).toEqual({})
	})

	it('passes through booleans and numbers', () => {
		const result = cleanQuery({ limit: 50, active: true, page: 0 })
		expect(result).toEqual({ limit: 50, active: true, page: 0 })
	})
})

describe('csvToJson', () => {
	it('parses a basic CSV string', () => {
		const csv = 'symbol,name,price\nAAPL,Apple,150.5\nMSFT,Microsoft,300.2'
		const result = csvToJson(csv)
		expect(result).toHaveLength(2)
		expect(result[0]).toEqual({ symbol: 'AAPL', name: 'Apple', price: 150.5 })
		expect(result[1]).toEqual({ symbol: 'MSFT', name: 'Microsoft', price: 300.2 })
	})

	it('handles empty CSV', () => {
		const result = csvToJson('')
		expect(result).toEqual([])
	})

	it('handles CSV with only headers', () => {
		const result = csvToJson('symbol,name')
		expect(result).toEqual([])
	})

	it('handles quoted fields', () => {
		const csv = 'symbol,description\nAAPL,"Apple, Inc."\nMSFT,"Microsoft ""Corp"""'
		const result = csvToJson(csv)
		expect(result).toHaveLength(2)
		expect(result[0].description).toBe('Apple, Inc.')
		expect(result[1].description).toBe('Microsoft "Corp"')
	})

	it('returns empty array on error', () => {
		const result = csvToJson('not,csv,data\nline1\nincomplete')
		expect(result).toEqual([])
	})
})

describe('uppercaseSymbolParams', () => {
	it('uppercases symbol param', () => {
		const url = new URL('https://api.test.com/endpoint?symbol=aapl')
		uppercaseSymbolParams(url)
		expect(url.searchParams.get('symbol')).toBe('AAPL')
	})

	it('uppercases symbols param', () => {
		const url = new URL('https://api.test.com/endpoint?symbols=aapl,msft')
		uppercaseSymbolParams(url)
		expect(url.searchParams.get('symbols')).toBe('AAPL,MSFT')
	})

	it('uppercases tickers param', () => {
		const url = new URL('https://api.test.com/endpoint?tickers=spy')
		uppercaseSymbolParams(url)
		expect(url.searchParams.get('tickers')).toBe('SPY')
	})

	it('does not modify unrelated params', () => {
		const url = new URL('https://api.test.com/endpoint?query=apple&limit=10')
		uppercaseSymbolParams(url)
		expect(url.searchParams.get('query')).toBe('apple')
		expect(url.searchParams.get('limit')).toBe('10')
	})

	it('handles missing params gracefully', () => {
		const url = new URL('https://api.test.com/endpoint')
		uppercaseSymbolParams(url)
		expect(url.href).toBe('https://api.test.com/endpoint')
	})
})

describe('injectApiKey', () => {
	it('throws when FMP_KEY is not set', () => {
		const prev = process.env.FMP_KEY
		delete process.env.FMP_KEY
		const url = new URL('https://api.test.com/endpoint')
		try {
			const { injectApiKey } = require('../src/utils/fmp-hooks')
			expect(() => injectApiKey(url)).toThrow('FMP_KEY')
		} finally {
			if (prev) process.env.FMP_KEY = prev
		}
	})
})

describe('getRedis', () => {
	it('returns null when REDIS_URL is not set', async () => {
		const prev = process.env.REDIS_URL
		delete process.env.REDIS_URL
		try {
			const { getRedis, closeRedis } = await import('../src/utils/redis')
			closeRedis()
			expect(await getRedis()).toBeNull()
		} finally {
			if (prev) process.env.REDIS_URL = prev
		}
	})
})
