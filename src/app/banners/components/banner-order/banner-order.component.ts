import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BannerOrderService} from '../../services/banner-order.service';
import {ActivatedRoute} from '@angular/router';
import {NotificationsService} from '../../../shared/components/reusable/notifications/notifications.service';
import {AppNotificationType} from '../../../shared/components/reusable/notifications/models/notification.model';
import {LanguageService} from '../../../core/services/language.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-banner-order',
  templateUrl: './banner-order.component.html',
  styleUrls: ['./banner-order.component.scss']
})
export class BannerOrderComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private bannerOrderService: BannerOrderService,
              private activatedRoute: ActivatedRoute,
              private notificationsService: NotificationsService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern(/^5[0-9]{8}/)]],
    });
  }

  get formValid(): boolean {
    return this.formGroup && this.formGroup.valid;
  }

  request() {
    this.formGroup.controls['phone'].markAsDirty();

    if (this.formValid) {
      const phone = this.formGroup.controls['phone'].value;
      const bannerId = this.activatedRoute.snapshot.params.id;

      this.bannerOrderService
        .requestPrice(phone, bannerId)
        .pipe(take(1))
        .subscribe(() => this.requestSent(), error => this.requestError(error));
    }
  }

  private requestSent(): void {
    this.languageService
      .translate('request-price.success')
      .pipe(take(1))
      .subscribe(text => {
        this.notificationsService.notify(AppNotificationType.success, text);
      });
  }

  private requestError(error: any): void {
    console.error(error);

    this.languageService
      .translate('request-price.error')
      .pipe(take(1))
      .subscribe(text => {
        this.notificationsService.notify(AppNotificationType.error, text);
      });
  }
}
