import type { KyRequest } from 'ky'
import { isHTTPError } from 'ky'
import process from 'node:process'
import Redis from 'ioredis'
import ky from 'ky'

if (!process.env.REDIS_URL) {
	throw new Error('REDIS_URL environment variable is required')
}

interface CacheEntry {
	contentType: string
	body: string
}

const redis = new Redis(process.env.REDIS_URL)

const USER_AGENT = 'Finset info@finset.ai'
const CACHE_PREFIX = 'sec_cache:'
const RATE_LIMIT_PREFIX = 'sec_rate_limit:'
const DEFAULT_CACHE_TTL_SECONDS = 60 * 60 * 24 * 7

const SEC_RATE_LIMIT = {
	maxRequests: 10,
	windowSeconds: 1,
	retryAfterMs: 1100,
}

async function enforceRateLimit(): Promise<void> {
	const now = Date.now()
	const windowStart =
		Math.floor(now / (SEC_RATE_LIMIT.windowSeconds * 1000)) * SEC_RATE_LIMIT.windowSeconds
	const rateLimitKey = `${RATE_LIMIT_PREFIX}${windowStart}`
	const currentCount = await redis.incr(rateLimitKey)
	if (currentCount === 1) {
		await redis.expire(rateLimitKey, SEC_RATE_LIMIT.windowSeconds + 1)
	}
	if (currentCount > SEC_RATE_LIMIT.maxRequests) {
		const nextWindow = (windowStart + SEC_RATE_LIMIT.windowSeconds) * 1000
		const waitTime = Math.max(nextWindow - now, SEC_RATE_LIMIT.retryAfterMs)
		console.log(`SEC rate limit exceeded. Waiting ${waitTime}ms before retrying...`)
		await new Promise((resolve) => setTimeout(resolve, waitTime))
		return enforceRateLimit()
	}
}

export const secApi = ky.create({
	timeout: 15000,
	hooks: {
		beforeRequest: [
			async ({ request }: { request: KyRequest }): Promise<Request | Response | void> => {
				request.headers.set('User-Agent', USER_AGENT)
				const cacheKey = `${CACHE_PREFIX}${request.url}`
				const cachedData = await redis.get(cacheKey)
				if (cachedData) {
					console.error(`[CACHE HIT] ${request.url}`)
					const cacheEntry: CacheEntry = JSON.parse(cachedData)
					return new Response(cacheEntry.body, {
						headers: { 'content-type': cacheEntry.contentType },
					})
				}
				await enforceRateLimit()
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
					const cacheKey = `${CACHE_PREFIX}${request.url}`
					const cacheEntry: CacheEntry = { contentType, body }
					redis
						.setex(cacheKey, DEFAULT_CACHE_TTL_SECONDS, JSON.stringify(cacheEntry))
						.catch((error) => console.error('[CACHE ERROR]', error))
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
