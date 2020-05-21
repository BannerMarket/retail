import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Urls} from '../../../assets/configs/urls';
import {map} from 'rxjs/operators';
import {LocalStorage} from '../global/local-storage';
import {Language} from '../models/language';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public static readonly DEFAULT_LANGUAGE = Language.ge;
  public static readonly LOCAL_STORAGE_KEY = 'LANG';

  constructor(private httpClient: HttpClient) { }

  public get(url: string, params: object = {}): Observable<any> {
    const options = { params: this.getParams(params) };

    return this.httpClient.get(Urls.ROOT + url, options)
      .pipe(map(this.handleSuccessfulResponse));
  }

  public post(url: string, params: object = {}): Observable<any> {
    return this.httpClient.post(Urls.ROOT + url, {language: this.getRequestLanguage(), ...params})
      .pipe(map(this.handleSuccessfulResponse));
  }

  private handleSuccessfulResponse(response: any): any {
    return response && response.data ? response.data : undefined;
  }

  private getParams(params: object): HttpParams {
    let p = new HttpParams();

    Object.keys(params).forEach(param => {
      p = p.append(param, params[param]);
    });

    if (!params['language']) {
      p = p.append('language', this.getRequestLanguage());
    }

    return p;
  }

  private getRequestLanguage(): Language {
    try {
      const language = LocalStorage.getItem(DataService.LOCAL_STORAGE_KEY);

      if (language && language === Language.ge || language === Language.en) {
        return language;
      }
    } catch (e) {
      console.error(e);
    }

    return DataService.DEFAULT_LANGUAGE;
  }
}
