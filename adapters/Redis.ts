import Redis from 'ioredis'
import { promisify } from 'util'

const redisClient = new Redis()

function getRedis(value: string) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient)
  return syncRedisGet(value)
}