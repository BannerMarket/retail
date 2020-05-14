import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BannersComponent} from './banners.component';
import {BannersRoutingModule} from './banners-routing.module';
import { BannerListingComponent } from './containers/banner-listing/banner-listing.component';
import { BannerMapComponent } from './components/banner-map/banner-map.component';
import { BannerListComponent } from './components/banner-list/banner-list.component';
import { BannerCardComponent } from './components/banner-card/banner-card.component';



@NgModule({
  declarations: [BannersComponent, BannerListingComponent, BannerMapComponent, BannerListComponent, BannerCardComponent],
  imports: [
    CommonModule,
    BannersRoutingModule
  ]
})
export class BannersModule { }
