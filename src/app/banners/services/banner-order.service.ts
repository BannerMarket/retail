import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../../core/services/data.service';
import {Urls} from '../../../assets/configs/urls';

@Injectable({
  providedIn: 'root'
})
export class BannerOrderService {

  constructor(private dataService: DataService) { }

  requestPrice(phone: string, bannerId: string): Observable<null> {
    return this.dataService.post(Urls.REQUEST_PRICE, {phone, bannerId});
  }
}
