import { isHTTPError } from 'ky'
import ky from 'ky'
import { enforceRateLimit, type RateLimitConfig } from './rate-limit.js'
import { getSecCacheKey, getFromCache, setCache } from './cache.js'

function getUserAgent(): string {
	const ua = process.env.SEC_USER_AGENT
	if (!ua) {
		throw new Error(
			'SEC_USER_AGENT environment variable is required (format: "YourName your@email.com")',
		)
	}
	return ua
}

const DEFAULT_CACHE_TTL_SECONDS = 60 * 60 * 24 * 7

const SEC_RATE_LIMIT: RateLimitConfig = {
	maxRequests: 10,
	windowSeconds: 1,
	retryAfterMs: 1100,
}

const RATE_LIMIT_PREFIX = 'sec_rate_limit:'

export const secApi = ky.create({
	timeout: 15000,
	hooks: {
		beforeRequest: [
			async ({
				request,
			}: {
				request: Request
				options: unknown
			}): Promise<Request | Response | void> => {
				request.headers.set('User-Agent', getUserAgent())

				const cacheKey = getSecCacheKey(request.url)
				const cached = await getFromCache(cacheKey)
				if (cached) {
					console.error(`[CACHE HIT] ${request.url}`)
					return cached
				}

				await enforceRateLimit(SEC_RATE_LIMIT, RATE_LIMIT_PREFIX)
				return request
			},
		],
		afterResponse: [
			async ({
				request,
				response,
			}: {
				request: Request
				response: Response
			}): Promise<Response | void> => {
				if (response.ok) {
					const contentType = response.headers.get('content-type') || 'text/plain'
					const clonedResponse = response.clone()
					const body = await clonedResponse.text()
					const cacheKey = getSecCacheKey(request.url)
					await setCache(cacheKey, body, contentType, DEFAULT_CACHE_TTL_SECONDS)
				}
				return response
			},
		],
		beforeError: [
			({ error }) => {
				if (isHTTPError(error)) {
					console.error(`SEC Request Failed: ${error.request?.method} ${error.request?.url}`)
					console.error(`Status: ${error.response?.status}`)
					if (error.response?.status === 429) {
						console.error('SEC rate limit exceeded by server')
					}
					if (error.data) {
						console.error('Response body:', error.data)
					}
				} else {
					console.error(`SEC Request Failed: ${error.message}`)
				}
				return error
			},
		],
	},
})
