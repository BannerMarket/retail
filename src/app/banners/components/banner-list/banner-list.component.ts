import {Component, Input, OnInit} from '@angular/core';
import {Banner} from '../../../shared/models/banner.model';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {

  @Input() banners: Array<Banner> = [];

  constructor() { }

  ngOnInit(): void {
  }

  public bannerTracker(index: number, banner: Banner): string {
    return banner._id;
  }
}
