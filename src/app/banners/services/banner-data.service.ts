import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Banner} from '../../shared/models/banner.model';
import {DataService} from '../../core/services/data.service';
import {Urls} from '../../../assets/configs/urls';

@Injectable({
  providedIn: 'root'
})
export class BannerDataService {

  constructor(private dataService: DataService) { }

  public getBanner(id: string | number): Observable<Banner> {
    return this.dataService.get(`${Urls.BANNER_BY_ID}/${id}`);
  }

  public getPromotedBanners(): Observable<Array<Banner>> {
    return this.dataService.get(Urls.PROMOTED_BANNERS);
  }
}
