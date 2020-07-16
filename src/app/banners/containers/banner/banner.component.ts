import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Banner} from '../../../shared/models/banner.model';
import {BannerDataService} from '../../services/banner-data.service';
import {take} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = [];
  private id = '';
  public banner: Banner;

  constructor(private activatedRoute: ActivatedRoute, private bannerDataService: BannerDataService) { }

  ngOnInit(): void {
    const subscription = this.activatedRoute.params.subscribe(params => {
      if (params.id !== this.id) {
        this.id = params.id;
        this.getBanner();
      }
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private getBanner(): void {
    this.bannerDataService
      .getBanner(this.id)
      .pipe(take(1))
      .subscribe(banner => this.banner = banner);
  }
}
