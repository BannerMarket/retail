import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Banner} from '../../../shared/models/banner.model';
import {take} from 'rxjs/operators';
import {BannerFilterService} from '../../services/banner-filter.service';

@Component({
  selector: 'app-banner-listing',
  templateUrl: './banner-listing.component.html',
  styleUrls: ['./banner-listing.component.scss']
})
export class BannerListingComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = [];

  public banners: Array<Banner> = [];

  constructor(private activatedRoute: ActivatedRoute, private bannerFilterService: BannerFilterService) { }

  ngOnInit(): void {
    this.listenToQueryParams();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private listenToQueryParams(): void {
    const subscription: Subscription = this.activatedRoute.queryParams.subscribe(params => {
      this.updateListData(params);
    });

    this.subscriptions.push(subscription);
  }

  private updateListData(params: any): void {
    const lat: string = params.lat;
    const lng: string = params.lng;
    const address: string = params.address;
    const categories: string = params.categories;

    this.fetchListData(lat, lng, address, categories);
  }

  private fetchListData(lat: string, lng: string, address: string, categories: string): void {
    this.bannerFilterService
      .getBanners(lat, lng, address, categories)
      .pipe(take(1))
      .subscribe(banners => this.banners = banners);
  }
}
