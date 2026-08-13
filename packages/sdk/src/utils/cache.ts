import { getRedis } from './redis.js'

const CACHE_PREFIX = 'fmp_cache:'
const SEC_CACHE_PREFIX = 'sec_cache:'

interface CacheEntry {
	contentType: string
	body: string
}

export function getFmpCacheKey(url: string): string {
	return `${CACHE_PREFIX}${url}`
}

export function getSecCacheKey(url: string): string {
	return `${SEC_CACHE_PREFIX}${url}`
}

export async function getFromCache(cacheKey: string): Promise<Response | null> {
	try {
		const redis = await getRedis()
		if (!redis) return null
		const cached = await redis.get(cacheKey)
		if (cached) {
			const entry: CacheEntry = JSON.parse(cached)
			return new Response(entry.body, {
				status: 200,
				headers: {
					'Content-Type': entry.contentType,
					'X-Cache-Hit': 'true',
				},
			})
		}
	} catch {
		console.error(`[CACHE ERROR] Failed to read cache key ${cacheKey}`)
	}
	return null
}

export async function setCache(
	cacheKey: string,
	body: string,
	contentType: string,
	ttlSeconds: number,
): Promise<void> {
	try {
		const redis = await getRedis()
		if (!redis) return
		const entry: CacheEntry = { contentType, body }
		await redis.set(cacheKey, JSON.stringify(entry), 'EX', ttlSeconds)
	} catch (e) {
		console.error(`[CACHE ERROR] Failed to set cache key ${cacheKey}:`, e)
	}
}
