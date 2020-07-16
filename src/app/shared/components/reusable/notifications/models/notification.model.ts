import {WithAutoId} from '../../../../../core/utils/withAutoId';

export enum AppNotificationType {
  error,
  success,
  message,
}

export interface AppNotificationConfig {
  offerRefresh?: boolean;
}

export class AppNotification extends WithAutoId {

  constructor(public type: AppNotificationType, public message: string, public config: AppNotificationConfig = {}) {
    super();
  }

}
