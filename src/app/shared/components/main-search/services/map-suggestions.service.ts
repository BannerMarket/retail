import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {MapSuggestion} from '../../../models/map-suggestion.model';
import {debounceTime, switchMap} from 'rxjs/operators';
import {DataService} from '../../../../core/services/data.service';
import {Urls} from '../../../../../assets/configs/urls';

@Injectable({
  providedIn: 'root'
})
export class MapSuggestionsService {

  constructor(private dataService: DataService) { }

  public getSuggestions(queries: Observable<{input: string, sessiontoken: string}>): Observable<Array<MapSuggestion>> {
    return queries.pipe(
        debounceTime(500),
        switchMap(data => this.fetchSuggestions(data.input, data.sessiontoken)),
      );
  }

  private fetchSuggestions(input: string, sessiontoken: string): Observable<Array<MapSuggestion>> {
    return this.dataService
      .get(`${Urls.PLACE_SUGGESTIONS}/${input}/${sessiontoken}`);
  }
}
