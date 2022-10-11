import { createClient } from 'redis'
import { Logger } from '../utils/logger'

export const redisClient = createClient({
  url: process.env.REDIS_URI ?? 'redis://localhost:6379',
})

redisClient.on('error', (error) => Logger.error(error))

export const connectRedis = async () => redisClient.connect()
