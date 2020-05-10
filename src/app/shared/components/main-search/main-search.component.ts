import { Component, OnInit } from '@angular/core';
import {Category} from '../../../core/models/category.model';
import {Directions} from '../../models/directions.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit {

  public lat: string | number;
  public lng: string | number;
  public categoryIds: string;

  public sessiontoken = '';

  constructor() { }

  ngOnInit(): void {
    this.sessiontoken = uuidv4();
  }

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

  public search(): void {
    this.sessiontoken = uuidv4();
  }
}
