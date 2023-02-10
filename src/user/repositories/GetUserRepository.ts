import { UserData } from "../entites/UserEntity";

export interface IGetUserRepository {
  get(query:any): Promise<UserData[]>
  getById(id: number): Promise<UserData>
}

export class GetUserRepository implements IGetUserRepository {
  constructor(
    private repository: IGetUserRepository 
  ){}

  async get(query: any): Promise<UserData[]> {
    return this.repository.get(query)
  }

  async getById(id: number): Promise<UserData> {
    return await this.repository.getById(id)
  }
}