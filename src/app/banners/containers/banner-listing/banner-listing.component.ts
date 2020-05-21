import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Banner} from '../../../shared/models/banner.model';
import {take} from 'rxjs/operators';
import {BannerFilterService} from '../../services/banner-filter.service';
import {Directions} from '../../../shared/models/directions.model';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'app-banner-listing',
  templateUrl: './banner-listing.component.html',
  styleUrls: ['./banner-listing.component.scss']
})
export class BannerListingComponent implements OnInit, OnDestroy {

  private readonly BANNERS_PER_PAGE = 5;

  private subscriptions: Array<Subscription> = [];

  public banners: Array<Banner> = [];
  public centerLat;
  public centerLng;
  public pages: number;
  public isLoading = true;

  constructor(private activatedRoute: ActivatedRoute,
              private bannerFilterService: BannerFilterService,
              private mapService: MapService) { }

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
    const page: number = params.page ? Number(params.page) : 1;

    this.fetchListData(lat, lng, address, categories, page);
    this.countPages(categories);
  }

  private fetchListData(lat: string, lng: string, address: string, categories: string, page: number): void {
    this.isLoading = true;

    const skip = (page - 1) * this.BANNERS_PER_PAGE;
    const limit = this.BANNERS_PER_PAGE;

    this.bannerFilterService
      .getBanners(lat, lng, address, categories, skip, limit)
      .pipe(take(1))
      .subscribe(banners => {
        this.banners = banners;
        const center: Directions = this.mapService.getCenter(banners);
        this.centerLat = center.lat;
        this.centerLng = center.lng;

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.isLoading = false;
      });
  }

  private countPages(categories: string): void {
    this.bannerFilterService
      .getBannerCount(categories)
      .pipe(take(1))
      .subscribe(count => {
        this.pages = Math.ceil(count / this.BANNERS_PER_PAGE);
      });
  }
}
