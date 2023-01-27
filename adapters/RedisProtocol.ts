export interface IRedisProtocol {
  getRedis(value: string): Promise<any>
  setRedis(key: string, value: string): Promise<any>
  redisClient: InstanceType<any>
}