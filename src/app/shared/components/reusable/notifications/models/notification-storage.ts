import {AppNotification} from './notification.model';

export class NotificationStorage {

  private notifications: Map<number, AppNotification> = new Map<number, AppNotification>();
  public notificationList: Array<AppNotification> = [];

  constructor() { }

  public push(notification: AppNotification): void {
    this.notifications.set(notification.id, notification);
    this.notificationList = this.getList(this.notifications);
  }

  public remove(notification: AppNotification): void {
    this.notifications.delete(notification.id);
    this.notificationList = this.getList(this.notifications);
  }

  private getList(notifications: Map<number, AppNotification>): Array<AppNotification> {
    return Array.from(notifications.values());
  }
}
