export interface UserData {
  id?: number
  username: string
  password: string
}

export class UserEntity implements UserData {
  public username: string
  public password: string
  constructor(data: UserData) {
    Object.assign(data, this)
  }
}