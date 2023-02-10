import { IAddUserRepository } from "../../repositories";
import { UserData, UserEntity } from '../../entites/UserEntity'


export class AddUserUseCase {
  constructor(
    private repository: IAddUserRepository
  ){}

  async execute(data:UserData) {
    const user = new UserEntity(data)
    if(!user.isValid()) {
      return {
        errors: user.notifications,
        statusCode: 400
      }
    }
    await this.repository.add(data)
    return {
      errors: null,
      statusCode: 201
    }
  }
}