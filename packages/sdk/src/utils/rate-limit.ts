import { getRedis } from './redis.js'

export interface RateLimitConfig {
	maxRequests: number
	windowSeconds: number
	retryAfterMs: number
}

export async function enforceRateLimit(config: RateLimitConfig, prefix: string): Promise<void> {
	const redis = getRedis()
	const now = Date.now()
	const windowStart = Math.floor(now / (config.windowSeconds * 1000)) * config.windowSeconds
	const rateLimitKey = `${prefix}${windowStart}`
	const currentCount = await redis.incr(rateLimitKey)
	if (currentCount === 1) {
		await redis.expire(rateLimitKey, config.windowSeconds + 1)
	}
	if (currentCount > config.maxRequests) {
		const nextWindow = (windowStart + config.windowSeconds) * 1000
		const waitTime = Math.max(nextWindow - now, config.retryAfterMs)
		console.log(`Rate limit exceeded (${prefix}). Waiting ${waitTime}ms...`)
		await new Promise((resolve) => setTimeout(resolve, waitTime))
		return enforceRateLimit(config, prefix)
	}
}
