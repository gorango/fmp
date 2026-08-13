import { getRedis } from './redis.js'

export interface RateLimitConfig {
	maxRequests: number
	windowSeconds: number
	retryAfterMs: number
}

const localCounters = new Map<string, number>()

function windowKey(now: number, config: RateLimitConfig, prefix: string): string {
	const windowStart = Math.floor(now / (config.windowSeconds * 1000)) * config.windowSeconds
	return `${prefix}${windowStart}`
}

async function enforceLocalRateLimit(config: RateLimitConfig, prefix: string): Promise<void> {
	const now = Date.now()
	const current = windowKey(now, config, prefix)
	const currentCount = (localCounters.get(current) ?? 0) + 1
	localCounters.set(current, currentCount)

	for (const key of localCounters.keys()) {
		if (key.startsWith(prefix) && key !== current) {
			localCounters.delete(key)
		}
	}

	if (currentCount > config.maxRequests) {
		const nextWindow =
			(Math.floor(now / (config.windowSeconds * 1000)) * config.windowSeconds +
				config.windowSeconds) *
			1000
		const waitTime = Math.max(nextWindow - now, config.retryAfterMs)
		console.log(`Rate limit exceeded (${prefix}). Waiting ${waitTime}ms...`)
		await new Promise((resolve) => setTimeout(resolve, waitTime))
		return enforceLocalRateLimit(config, prefix)
	}
}

export async function enforceRateLimit(config: RateLimitConfig, prefix: string): Promise<void> {
	const redis = await getRedis()
	if (!redis) {
		return enforceLocalRateLimit(config, prefix)
	}
	try {
		const now = Date.now()
		const key = windowKey(now, config, prefix)
		const currentCount = await redis.incr(key)
		if (currentCount === 1) {
			await redis.expire(key, config.windowSeconds + 1)
		}
		if (currentCount > config.maxRequests) {
			const nextWindow =
				(Math.floor(now / (config.windowSeconds * 1000)) * config.windowSeconds +
					config.windowSeconds) *
				1000
			const waitTime = Math.max(nextWindow - now, config.retryAfterMs)
			console.log(`Rate limit exceeded (${prefix}). Waiting ${waitTime}ms...`)
			await new Promise((resolve) => setTimeout(resolve, waitTime))
			return enforceRateLimit(config, prefix)
		}
	} catch (e) {
		console.error('[RATE LIMIT ERROR] Falling back to in-memory limiter:', e)
		return enforceLocalRateLimit(config, prefix)
	}
}
