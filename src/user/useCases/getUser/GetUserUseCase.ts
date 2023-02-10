import { IGetUserRepository } from "../../repositories/GetUserRepository";

export class GetUserUseCase {
  constructor(private repository: IGetUserRepository) {}

  async getAll(query: any) {
    return this.repository.get(query)
  }

}