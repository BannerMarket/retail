import { Injectable } from '@angular/core';
import {AppNotification, AppNotificationConfig, AppNotificationType} from './models/notification.model';
import {Subject, timer} from 'rxjs';
import {take} from 'rxjs/operators';
import {NotificationStorage} from './models/notification-storage';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private readonly KEEP_NOTIFICATION_FOR = 5000;
  private readonly NOTIFICATION_ANIMATION_LENGTH = 400;

  private notificationStorage: NotificationStorage = new NotificationStorage();

  public notificationsToRemove: Subject<number> = new Subject();

  constructor() { }

  public get notifications(): Array<AppNotification> {
    return this.notificationStorage.notificationList;
  }

  public pushNotification(notification: AppNotification): void {
    this.notificationStorage.push(notification);
    this.prepareToRemove(notification);
  }

  public notify(type: AppNotificationType, message: string, config: AppNotificationConfig = {}): void {
    this.pushNotification(new AppNotification(type, message, config));
  }

  private prepareToRemove(notification: AppNotification): void {
    timer(this.KEEP_NOTIFICATION_FOR)
      .pipe(take(1))
      .subscribe(() => this.notificationsToRemove.next(notification.id));

    timer(this.KEEP_NOTIFICATION_FOR + this.NOTIFICATION_ANIMATION_LENGTH)
      .pipe(take(1))
      .subscribe(() => this.notificationStorage.remove(notification));
  }
}
