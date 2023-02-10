export default class Notification {
  public notifications: string[] = []
  


  hasNotifications() {
      return this.notifications.length > 0
  }

  addNotification(notication) {
      this.notifications.push(notication)
  }
}