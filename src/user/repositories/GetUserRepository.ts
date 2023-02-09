import { UserData } from "../entites/UserEntity";

export interface IGetUserRepository {
  get(query:any): Promise<UserData>
}

export class GetUserRepository implements IGetUserRepository {
  constructor(
    private repository: IGetUserRepository 
  ){}

  async get(query: any): Promise<UserData> {
    return this.repository.get(query)
  }
}