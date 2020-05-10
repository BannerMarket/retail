import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MapSuggestionsService} from '../services/map-suggestions.service';
import {MapSuggestion} from '../../../models/map-suggestion.model';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss']
})
export class LocationInputComponent implements OnInit {

  @Input() sessiontoken = '';
  @Output() directions: EventEmitter<string> = new EventEmitter<string>();

  public suggestions$: Observable<Array<MapSuggestion>>;
  private queries$: Subject<{input: string, sessiontoken: string}> = new Subject();
  public shouldDisplay = false;
  public location = '';

  constructor(private mapSuggestionsService: MapSuggestionsService) { }

  ngOnInit(): void {
    this.suggestions$ = this.mapSuggestionsService.getSuggestions(this.queries$);
  }

  public getSuggestions(): void {
    this.queries$.next({input: this.location, sessiontoken: this.sessiontoken});
  }

  public displaySuggestions(shouldDisplay: boolean, delay = 0): void {
    setTimeout(() => this.shouldDisplay = shouldDisplay, delay);
  }

  public applySuggestion(suggestion: MapSuggestion): void {
    this.location = suggestion.description;
    this.directions.emit(this.location);
  }
}
