import type { HTTPError, Options as KyOptions, KyRequest } from 'ky'
import { Buffer } from 'node:buffer'
import process from 'node:process'
import Redis from 'ioredis'
import ky from 'ky'
import { TRANSFORMATION_CONFIG } from './transform.js'
import { TTL_CONFIG } from './ttl.js'

const apiKey = process.env.FMP_KEY
const baseUrl = 'https://financialmodelingprep.com/stable/'

if (!apiKey) {
	throw new Error('FMP_KEY environment variable is required')
}

if (!process.env.REDIS_URL) {
	throw new Error('REDIS_URL environment variable is required')
}

interface CacheEntry {
	contentType: string
	body: string
}

const redis = new Redis(process.env.REDIS_URL)
const CACHE_PREFIX = 'fmp_cache:'
const RATE_LIMIT_PREFIX = 'fmp_rate_limit:'
const DEFAULT_CACHE_TTL_SECONDS = 60 * 30 // 30 minutes

const FMP_RATE_LIMIT = {
	maxRequests: 700,
	windowSeconds: 60,
	retryAfterMs: 10_000,
}

async function enforceRateLimit(): Promise<void> {
	const now = Date.now()
	const windowStart = Math.floor(now / (FMP_RATE_LIMIT.windowSeconds * 1000)) * FMP_RATE_LIMIT.windowSeconds
	const rateLimitKey = `${RATE_LIMIT_PREFIX}${windowStart}`
	const currentCount = await redis.incr(rateLimitKey)
	// Set expiration only on first increment to avoid race conditions
	if (currentCount === 1) {
		await redis.expire(rateLimitKey, FMP_RATE_LIMIT.windowSeconds + 1)
	}
	if (currentCount > FMP_RATE_LIMIT.maxRequests) {
		const nextWindow = (windowStart + FMP_RATE_LIMIT.windowSeconds) * 1000
		const waitTime = Math.max(nextWindow - now, FMP_RATE_LIMIT.retryAfterMs)
		console.log(`SEC rate limit exceeded. Waiting ${waitTime}ms before retrying...`)
		await new Promise(resolve => setTimeout(resolve, waitTime))
		return enforceRateLimit()
	}
}

export const fmpApi = ky.create({
	prefixUrl: baseUrl,
	timeout: 15000,
	hooks: {
		beforeRequest: [
			async (request: KyRequest): Promise<Request | Response | void> => {
				const url = new URL(request.url)
				url.searchParams.set('apikey', apiKey)

				const paramsToUppercase: ('symbol' | 'symbols' | 'tickers')[] = ['symbol', 'symbols', 'tickers']
				paramsToUppercase.forEach((paramName) => {
					if (url.searchParams.has(paramName)) {
						const value = url.searchParams.get(paramName)
						if (typeof value === 'string') {
							url.searchParams.set(paramName, value.toUpperCase())
						}
					}
				})

				const finalRequestUrl = url.href
				const modifiedRequest = new Request(finalRequestUrl, request)

				if (request.method.toUpperCase() === 'GET') {
					const cacheKey = `${CACHE_PREFIX}${finalRequestUrl}`
					const cachedDataString = await redis.get(cacheKey)
					if (cachedDataString) {
						try {
							const cachedEntry: CacheEntry = JSON.parse(cachedDataString)
							console.log(`[CACHE HIT] ${finalRequestUrl.split('/').pop()}`)
							return new Response(cachedEntry.body, {
								status: 200,
								headers: {
									'Content-Type': cachedEntry.contentType,
									'X-Cache-Hit': 'true',
								},
							})
						}
						catch (e) {
							console.error(`[CACHE ERROR] Failed to parse cached entry for ${finalRequestUrl}. Removing corrupted entry. Error:`, e)
							await redis.del(cacheKey)
						}
					}
				}
				await enforceRateLimit()
				return modifiedRequest
			},
		],
		afterResponse: [
			async (request: Request, _options: KyOptions, response: Response): Promise<Response | void> => {
				if (request.method.toUpperCase() === 'GET' && response.ok && !response.headers.get('X-Cache-Hit')) {
					const responseToCache = response.clone()
					const originalResponseBody = await responseToCache.text()
					const contentType = response.headers.get('Content-Type') || 'application/octet-stream'

					let processedBody = originalResponseBody
					if (contentType.includes('application/json')) {
						const requestUrl = new URL(request.url)
						const apiPath = requestUrl.pathname.startsWith(new URL(baseUrl).pathname)
							? requestUrl.pathname.substring(new URL(baseUrl).pathname.length)
							: requestUrl.pathname

						for (const rule of TRANSFORMATION_CONFIG) {
							if (rule.pattern.test(apiPath)) {
								try {
									const parsedData = JSON.parse(originalResponseBody)
									const transformedData = rule.transform(parsedData)
									processedBody = JSON.stringify(transformedData)
									// console.log(`[TRANSFORMATION] Applied rule for ${apiPath} (${rule.description || rule.pattern.toString()})`)
									break
								}
								catch (e) {
									console.error(`[TRANSFORMATION ERROR] Failed to apply transformation for ${apiPath}. Error:`, e)
									processedBody = originalResponseBody
								}
							}
						}
					}

					const cacheKey = `${CACHE_PREFIX}${request.url}`
					const cacheEntry: CacheEntry = {
						contentType,
						body: processedBody,
					}
					const cacheEntryString = JSON.stringify(cacheEntry)

					let ttlToUse = DEFAULT_CACHE_TTL_SECONDS
					const requestUrl = new URL(request.url)
					const apiPath = requestUrl.pathname.startsWith(new URL(baseUrl).pathname)
						? requestUrl.pathname.substring(new URL(baseUrl).pathname.length)
						: requestUrl.pathname

					for (const rule of TTL_CONFIG) {
						if (rule.pattern.test(apiPath)) {
							ttlToUse = rule.ttl
							console.log(`[CACHE SET] ${request.url.split('/').pop()} with TTL: ${ttlToUse}s`)
							break
						}
					}
					if (ttlToUse === DEFAULT_CACHE_TTL_SECONDS && !TTL_CONFIG.some(rule => rule.pattern.test(apiPath))) { // Check if default was because no rule matched
						console.log(`[CACHE SET] ${request.url.split('/').pop()} with DEFAULT TTL: ${ttlToUse}s`)
					}

					await redis.set(cacheKey, cacheEntryString, 'EX', ttlToUse)

					if (processedBody !== originalResponseBody) {
						const headers = new Headers(response.headers)
						headers.set('Content-Length', String(Buffer.byteLength(processedBody, 'utf8')))
						return new Response(processedBody, {
							status: response.status,
							statusText: response.statusText,
							headers,
						})
					}
				}
				return response
			},
		],
		beforeError: [
			(error: HTTPError) => {
				console.error(`FMP API Request Failed: ${error.request?.method} ${error.request?.url}`)
				console.error(`Status: ${error.response?.status}`)
				if (error.response?.status === 429) {
					console.error('FMP rate limit exceeded by server')
				}
				if (error.response && error.response.body) {
					error.response.clone().text().then((body) => {
						console.error('Response body:', body)
					}).catch(e => console.error('Failed to read error response body:', e))
				}
				return error
			},
		],
	},
})

export const fmpApiStream = ky.create({
	prefixUrl: baseUrl,
	timeout: 15000,
	hooks: {
		beforeRequest: [
			async (request: KyRequest): Promise<Request | Response | void> => {
				const url = new URL(request.url)
				url.searchParams.set('apikey', apiKey)

				const paramsToUppercase: ('symbol' | 'symbols' | 'tickers')[] = ['symbol', 'symbols', 'tickers']
				paramsToUppercase.forEach((paramName) => {
					if (url.searchParams.has(paramName)) {
						const value = url.searchParams.get(paramName)
						if (typeof value === 'string') {
							url.searchParams.set(paramName, value.toUpperCase())
						}
					}
				})

				const finalRequestUrl = url.href
				const modifiedRequest = new Request(finalRequestUrl, request)

				await enforceRateLimit()
				return modifiedRequest
			},
		],
		beforeError: [
			(error: HTTPError) => {
				console.error(`FMP API Streaming Request Failed: ${error.request?.method} ${error.request?.url}`)
				console.error(`Status: ${error.response?.status}`)
				if (error.response?.status === 429) {
					console.error('FMP rate limit exceeded by server')
				}
				if (error.response && error.response.body) {
					error.response.clone().text().then((body) => {
						console.error('Response body:', body)
					}).catch(e => console.error('Failed to read error response body:', e))
				}
				return error
			},
		],
	},
})

type KySearchParams = Record<string, string | number | boolean>

/**
 * Cleans up query parameters for FMP API requests.
 */
export function cleanQuery(query: Record<string, any> = {}): KySearchParams {
	return Object.entries(query).reduce((acc: KySearchParams, [key, value]) => {
		if (value !== undefined && value !== null) {
			if (Array.isArray(value)) {
				acc[key] = value.join(',')
			}
			else {
				acc[key] = value as string | number | boolean
			}
		}
		return acc
	}, {})
}
