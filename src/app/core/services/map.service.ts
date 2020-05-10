import { Injectable } from '@angular/core';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public static readonly API_KEY = 'AIzaSyC67VQLJuEiyJkP7cbb7Swfu9OBTpGIcWg';

  constructor(private httpClient: HttpClient) { }

  // public getAutofillSuggestions(str: string): Array<any> {
  //   // return this.httpClient.
  // }

}
