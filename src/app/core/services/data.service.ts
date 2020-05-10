import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../../../assets/configs/urls';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public get(url: string, params: object = {}): Observable<any> {
    return this.httpClient.get(Urls.ROOT + url + '?' + this.toGetParams(params))
      .pipe(map(this.handleSuccessfulResponse));
  }

  private toGetParams(params: object): string {
    return Array.from(Object.keys(params))
      .reduce((res, key) => res + `${key}=${params[key]}&`, '');
  }

  private handleSuccessfulResponse(response: any): any {
    return response && response.data ? response.data : undefined;
  }
}
