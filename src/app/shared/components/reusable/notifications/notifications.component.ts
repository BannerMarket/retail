import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppNotification} from './models/notification.model';
import {NotificationsService} from './notifications.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = [];
  private notificationsToRemove: Set<number> = new Set<number>();

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.subscriptions.push(this.notificationsService.notificationsToRemove
      .subscribe(id => this.notificationsToRemove.add(id)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public get notifications(): Array<AppNotification> {
    return this.notificationsService.notifications;
  }

  public trackNotifications(index: number, notification: AppNotification): number {
    return notification.id;
  }

  public disappears(id: number): boolean {
    return this.notificationsToRemove.has(id);
  }
}
