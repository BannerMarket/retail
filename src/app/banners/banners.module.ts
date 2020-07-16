import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BannersComponent} from './banners.component';
import {BannersRoutingModule} from './banners-routing.module';
import { BannerListingComponent } from './containers/banner-listing/banner-listing.component';
import { BannerMapComponent } from './components/banner-map/banner-map.component';
import { BannerListComponent } from './components/banner-list/banner-list.component';
import { BannerCardComponent } from './components/banner-card/banner-card.component';
import {SharedModule} from '../shared/shared.module';
import {GoogleMapsModule} from '@angular/google-maps';
import { BannerComponent } from './containers/banner/banner.component';
import { BannerOrderComponent } from './components/banner-order/banner-order.component';
import {ReactiveFormsModule} from '@angular/forms';
import { PromotedBannerComponent } from './components/promoted-banner/promoted-banner.component';



@NgModule({
    declarations: [BannersComponent, BannerListingComponent, BannerMapComponent, BannerListComponent, BannerCardComponent, BannerComponent, BannerOrderComponent, PromotedBannerComponent],
    exports: [
        PromotedBannerComponent
    ],
    imports: [
        CommonModule,
        BannersRoutingModule,
        SharedModule,
        GoogleMapsModule,
        ReactiveFormsModule
    ]
})
export class BannersModule { }
