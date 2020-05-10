import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BannersComponent} from './banners.component';
import {BannersRoutingModule} from './banners-routing.module';



@NgModule({
  declarations: [BannersComponent],
  imports: [
    CommonModule,
    BannersRoutingModule
  ]
})
export class BannersModule { }
