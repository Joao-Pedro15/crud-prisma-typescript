import { IAddUserRepository } from "../../repositories";

export class AddUserUseCase {
  constructor(
    private repository: IAddUserRepository
  ){}

  async execute(data:any) {
      return this.repository.add(data)
  }
}