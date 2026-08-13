import type { Redis } from 'ioredis'

let redis: Redis | null = null

export async function getRedis(): Promise<Redis | null> {
	if (redis) return redis
	const url = process.env.REDIS_URL
	if (!url) return null
	try {
		const { Redis } = await import('ioredis')
		redis = new Redis(url)
		redis.on('error', (err) => {
			console.error('[REDIS ERROR]', err)
		})
		return redis
	} catch (e) {
		console.error('[REDIS ERROR] Failed to create Redis client:', e)
		return null
	}
}

export function closeRedis(): void {
	redis?.disconnect()
	redis = null
}
