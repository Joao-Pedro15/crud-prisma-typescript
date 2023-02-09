import { UserData } from "../entites/UserEntity";

export interface IAddUserRepository {
  add(data: UserData): Promise<void>
}

export class AddUserRepository implements IAddUserRepository {
  constructor(
    private repository: IAddUserRepository
  ) {}

  async add(data: UserData): Promise<void> {
    return this.repository.add(data)
  }
}