import type { KyRequest } from 'ky'

const paramsToUppercase: ('symbol' | 'symbols' | 'tickers')[] = ['symbol', 'symbols', 'tickers']

export function injectApiKey(url: URL): void {
	const apiKey = process.env.FMP_KEY
	if (!apiKey) {
		throw new Error('FMP_KEY environment variable is required')
	}
	url.searchParams.set('apikey', apiKey)
}

export function uppercaseSymbolParams(url: URL): void {
	for (const paramName of paramsToUppercase) {
		if (url.searchParams.has(paramName)) {
			const value = url.searchParams.get(paramName)
			if (typeof value === 'string') {
				url.searchParams.set(paramName, value.toUpperCase())
			}
		}
	}
}

export function prepareFmpRequest(request: KyRequest): Request {
	const url = new URL(request.url)
	injectApiKey(url)
	uppercaseSymbolParams(url)
	return new Request(url.href, request)
}
