import Redis from 'ioredis'
import { promisify } from 'util'
import { IRedisProtocol } from '../RedisProtocol'
const redisClient = new Redis()

export class RedisAdapter implements IRedisProtocol {
  private readonly RedisClient: Redis
  constructor(){
    this.RedisClient = new Redis()
  }
  redisClient() {
    return this.RedisClient
  }
  getRedis(value: string): Promise<any> {
    const syncRedisGet = promisify(this.RedisClient.get).bind(redisClient)
    return syncRedisGet
  }

  setRedis(key: string, value: string): Promise<any> {
    const syncRedisSet = promisify(this.RedisClient.set).bind(redisClient)
    return syncRedisSet(key, value)
  }

}