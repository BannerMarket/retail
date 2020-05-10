import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {MapSuggestion} from '../../../models/map-suggestion.model';

@Injectable({
  providedIn: 'root'
})
export class MapSuggestionsService {

  private readonly suggestions: Array<MapSuggestion> = [
    {
      name: 'Vazha Pshavela Ave',
      lat: 41.7260234,
      lng: 44.7449978
    },
    {
      name: 'Illia Chavchavadze Ave',
      lat: 41.7155266,
      lng: 44.7647105
    },
  ];

  constructor() { }

  public getSuggestions(str: string): Observable<Array<MapSuggestion>> {
    return of(this.suggestions);
  }
}
