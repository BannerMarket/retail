import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss']
})
export class LocationInputComponent implements OnInit {

  public suggestions = [
    {type: 'banner', text: '1024123232'},
    {type: 'location', text: 'Tsotne Dadiani St.'},
    {type: 'location', text: 'Vake'},
    {type: 'location', text: 'Nutsubidze I mikro raioni pirveli korpusi'},
  ];

  public shouldDisplay = false;
  public location = '';

  constructor() { }

  ngOnInit(): void {}

  public displaySuggestions(shouldDisplay: boolean, delay = 0): void {
    setTimeout(() => this.shouldDisplay = shouldDisplay, delay);
  }

  public applySuggestion(suggestion: string): void {
    console.log(suggestion);
    this.location = suggestion;
  }
}
