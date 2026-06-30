import type { Options as KyOptions, KyRequest } from 'ky'
import { isHTTPError } from 'ky'
import { Buffer } from 'node:buffer'
import ky from 'ky'
import { enforceRateLimit, type RateLimitConfig } from './rate-limit.js'
import { getFmpCacheKey, getFromCache, setCache } from './cache.js'
import { prepareFmpRequest } from './fmp-hooks.js'
import { TRANSFORMATION_CONFIG } from './transform.js'
import { TTL_CONFIG } from './ttl.js'

const baseUrl = 'https://financialmodelingprep.com/stable/'

const DEFAULT_CACHE_TTL_SECONDS = 60 * 30

const FMP_RATE_LIMIT: RateLimitConfig = {
	maxRequests: 700,
	windowSeconds: 60,
	retryAfterMs: 10_000,
}

const RATE_LIMIT_PREFIX = 'fmp_rate_limit:'

// Shared before-request logic
async function fmpBeforeRequest({
	request,
}: {
	request: KyRequest
	options: KyOptions
}): Promise<Request | Response | void> {
	const modifiedRequest = prepareFmpRequest(request)

	if (request.method.toUpperCase() === 'GET') {
		const cached = await getFromCache(getFmpCacheKey(modifiedRequest.url))
		if (cached) {
			console.error(`[CACHE HIT] ${modifiedRequest.url.split('/').pop()}`)
			return cached
		}
	}

	await enforceRateLimit(FMP_RATE_LIMIT, RATE_LIMIT_PREFIX)
	return modifiedRequest
}

export const fmpApi = ky.create({
	prefix: baseUrl,
	timeout: 15000,
	hooks: {
		beforeRequest: [fmpBeforeRequest],
		afterResponse: [
			async ({
				request,
				options: _options,
				response,
			}: {
				request: Request
				options: KyOptions
				response: Response
			}): Promise<Response | void> => {
				if (
					request.method.toUpperCase() === 'GET' &&
					response.ok &&
					!response.headers.get('X-Cache-Hit')
				) {
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
									break
								} catch (e) {
									console.error(
										`[TRANSFORMATION ERROR] Failed to apply transformation for ${apiPath}. Error:`,
										e,
									)
									processedBody = originalResponseBody
								}
							}
						}
					}

					const cacheKey = getFmpCacheKey(request.url)
					let ttlToUse = DEFAULT_CACHE_TTL_SECONDS
					const requestUrl = new URL(request.url)
					const apiPath = requestUrl.pathname.startsWith(new URL(baseUrl).pathname)
						? requestUrl.pathname.substring(new URL(baseUrl).pathname.length)
						: requestUrl.pathname

					for (const rule of TTL_CONFIG) {
						if (rule.pattern.test(apiPath)) {
							ttlToUse = rule.ttl
							break
						}
					}

					await setCache(cacheKey, processedBody, contentType, ttlToUse)

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
			({ error }) => {
				if (isHTTPError(error)) {
					console.error(`FMP API Request Failed: ${error.request?.method} ${error.request?.url}`)
					console.error(`Status: ${error.response?.status}`)
					if (error.response?.status === 429) {
						console.error('FMP rate limit exceeded by server')
					}
					if (error.data) {
						console.error('Response body:', error.data)
					}
				} else {
					console.error(`FMP API Request Failed: ${error.message}`)
				}
				return error
			},
		],
	},
})

export const fmpApiStream = ky.create({
	prefix: baseUrl,
	timeout: 15000,
	hooks: {
		beforeRequest: [
			async ({
				request,
			}: {
				request: KyRequest
				options: KyOptions
			}): Promise<Request | Response | void> => {
				const modified = prepareFmpRequest(request)
				await enforceRateLimit(FMP_RATE_LIMIT, RATE_LIMIT_PREFIX)
				return modified
			},
		],
		beforeError: [
			({ error }) => {
				if (isHTTPError(error)) {
					console.error(
						`FMP API Streaming Request Failed: ${error.request?.method} ${error.request?.url}`,
					)
					console.error(`Status: ${error.response?.status}`)
					if (error.response?.status === 429) {
						console.error('FMP rate limit exceeded by server')
					}
					if (error.data) {
						console.error('Response body:', error.data)
					}
				} else {
					console.error(`FMP API Streaming Request Failed: ${error.message}`)
				}
				return error
			},
		],
	},
})

type KySearchParams = Record<string, string | number | boolean>

export function cleanQuery(query: Record<string, any> = {}): KySearchParams {
	return Object.entries(query).reduce((acc: KySearchParams, [key, value]) => {
		if (value !== undefined && value !== null) {
			if (Array.isArray(value)) {
				acc[key] = value.join(',')
			} else {
				acc[key] = value as string | number | boolean
			}
		}
		return acc
	}, {})
}
