import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from '../../../core/models/category.model';
import { v4 as uuidv4 } from 'uuid';
import {CategoriesInputComponent} from './categories-input/categories-input.component';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit {

  @ViewChild(CategoriesInputComponent) categoriesInput: CategoriesInputComponent;

  public categoryIds: string;
  public address: string;

  public sessiontoken = '';

  constructor() { }

  ngOnInit(): void {
    this.sessiontoken = uuidv4();
  }

  public setAddress(address: string): void {
   this.address = address;
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
