import { Component, OnInit } from '@angular/core';
import {Category} from '../../../core/models/category.model';
import {Directions} from '../../models/directions.model';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit {

  private lat: string | number;
  private lng: string | number;
  private categoryIds: string;

  constructor() { }

  ngOnInit(): void { }

  public setDirections(directions: Directions): void {
    this.lat = directions.lat;
    this.lng = directions.lng;
  }

  public setCategories(categories: Array<Category>): void {
    this.categoryIds = categories.length === 0 ?
      '' :
      categories
        .map(category => category._id)
        .reduce((_categories, categoryId) => _categories + ',' + categoryId);
  }
}
