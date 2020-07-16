import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from "../shared/shared.module";
import {BannersModule} from '../banners/banners.module';

@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        BannersModule
    ]
})
export class HomeModule { }
