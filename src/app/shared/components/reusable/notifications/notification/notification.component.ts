import {Component, Input, OnInit} from '@angular/core';
import {AppNotification, AppNotificationType} from '../models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public readonly AppNotificationType = AppNotificationType;

  @Input() notification: AppNotification;
  constructor() { }

  ngOnInit() {
  }

  public get hasOptions(): boolean {
    return Object.values(this.notification.config).length > 0;
  }

  public refresh() {
    window.location.reload();
  }
}
