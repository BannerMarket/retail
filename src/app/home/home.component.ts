import { Component, OnInit } from '@angular/core';
import {DataService} from '../core/services/data.service';
import {Urls} from '../../assets/configs/urls';
import {take} from 'rxjs/operators';
import {Banner} from '../shared/models/banner.model';
import {BannerDataService} from '../banners/services/banner-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public images: Array<string> = [];
  public banners: Array<Banner> = [];

  constructor(private dataService: DataService, private bannerDataService: BannerDataService) { }

  ngOnInit(): void {
    this.dataService.get(Urls.HERO_IMAGES)
      .pipe(take(1))
      .subscribe(response => this.images = response.map(file => file.path));

    this.bannerDataService.getPromotedBanners()
      .pipe(take(1))
      .subscribe(banners => this.banners = banners);
  }

}
