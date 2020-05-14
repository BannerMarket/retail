import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MapSuggestionsService} from '../services/map-suggestions.service';
import {MapSuggestion} from '../../../models/map-suggestion.model';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss']
})
export class LocationInputComponent implements OnInit, OnDestroy {

  @Input() sessiontoken = '';
  @Output() address: EventEmitter<string> = new EventEmitter<string>();
  @Output() suggestionSelected: EventEmitter<string> = new EventEmitter<string>();

  private subscriptions: Array<Subscription> = [];

  public suggestions: Array<MapSuggestion> = [];
  private queries$: BehaviorSubject<{input: string, sessiontoken: string}>;
  public shouldDisplay = false;
  public location = '';

  constructor(private mapSuggestionsService: MapSuggestionsService) { }

  ngOnInit(): void {
    this.queries$ = new BehaviorSubject({input: '', sessiontoken: this.sessiontoken});

    const subscription: Subscription = this.mapSuggestionsService
      .getSuggestions(this.queries$)
      .subscribe(suggestions => this.suggestions = suggestions);

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public getSuggestions(): void {
    this.queries$.next({input: this.location, sessiontoken: this.sessiontoken});
    this.address.emit(this.location);
  }

  public displaySuggestions(shouldDisplay: boolean, delay = 0): void {
    setTimeout(() => this.shouldDisplay = shouldDisplay, delay);
  }

  public applySuggestion(suggestion: MapSuggestion): void {
    this.location = suggestion.description;
    this.address.emit(this.location);
    this.suggestionSelected.emit(this.location);
  }

  public clear(): void {
    this.location = '';
    this.address.emit(this.location);
  }
}
