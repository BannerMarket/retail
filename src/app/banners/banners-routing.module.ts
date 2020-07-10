import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BannersComponent} from './banners.component';
import {BannerListingComponent} from './containers/banner-listing/banner-listing.component';
import {BannerComponent} from './containers/banner/banner.component';

const routes: Routes = [
  {
    path: '',
    component: BannersComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        data: {logoSmallMargin: true},
        component: BannerListingComponent
      },
      {
        path: 'banner/:id',
        component: BannerComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class BannersRoutingModule {}
