import { Injectable } from '@angular/core';
import {DataService} from '../../core/services/data.service';
import {Observable} from 'rxjs';
import {Banner} from '../../shared/models/banner.model';
import {Urls} from '../../../assets/configs/urls';

@Injectable({
  providedIn: 'root'
})
export class BannerFilterService {

  constructor(private dataService: DataService) { }

  public getBanners(lat: string, lng: string, address: string, categories: string): Observable<Array<Banner>> {
    return this.dataService.get(Urls.FILTER_BANNERS, {lat, lng, address, categories});
  }
}
