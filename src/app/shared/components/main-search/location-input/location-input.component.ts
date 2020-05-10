import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MapSuggestionsService} from '../services/map-suggestions.service';
import {MapSuggestion} from '../../../models/map-suggestion.model';
import {Observable} from 'rxjs';
import {Directions} from '../../../models/directions.model';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss']
})
export class LocationInputComponent implements OnInit {

  @Output() directions: EventEmitter<Directions> = new EventEmitter<Directions>();

  public suggestions$: Observable<Array<MapSuggestion>>;

  public shouldDisplay = false;
  public location = '';

  constructor(private mapSuggestionsService: MapSuggestionsService) { }

  ngOnInit(): void {}

  public getSuggestions(): void {
    this.suggestions$ = this.mapSuggestionsService.getSuggestions(this.location);
  }

  public displaySuggestions(shouldDisplay: boolean, delay = 0): void {
    setTimeout(() => this.shouldDisplay = shouldDisplay, delay);
  }

  public applySuggestion(suggestion: MapSuggestion): void {
    this.location = suggestion.name;
    this.directions.emit({lat: suggestion.lat, lng: suggestion.lng});
  }
}
