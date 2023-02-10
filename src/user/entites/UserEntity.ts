import Notification from "../../notifications/notifications"

export interface UserData {
  id?: number
  username: string
  password: string
}

export class UserEntity extends Notification implements UserData {
  public username: string
  public password: string
  constructor(data: UserData) {
    super()
    Object.assign(data, this)
  }

  isValid() {
    if(this.password.trim().length === 0) {
      this.addNotification('username and password not empty')
    }

    return !this.hasNotifications()
  }
}