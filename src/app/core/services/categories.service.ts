import { Injectable } from '@angular/core';
import {DataService} from './data.service';
import {Observable} from 'rxjs';
import {Category} from '../models/category.model';
import {Urls} from '../../../assets/configs/urls';
import {map, shareReplay} from 'rxjs/operators';
import {Tree, TreeNode} from '../models/tree.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private allCategories: Observable<Array<Category>>;

  constructor(private dataService: DataService) { }

  public getAllCategories(): Observable<Array<Category>> {
    if (!this.allCategories) {
      this.allCategories = this.dataService
        .get(Urls.CATEGORIES)
        .pipe(shareReplay());
    }

    return this.allCategories;
  }

  public getCategoryGroups(): Observable<Tree<Category>> {
    return this.getAllCategories().pipe(map(categories => {
      const groups = categories
        .filter(this.isGroup)
        .sort(this.sortBySortOrder);

      return groups
        .map(this.categoriesOfGroup(categories));
    }));
  }

  public isGroup(category: Category): boolean {
    return category && category.parentId === 'null';
  }

  private sortBySortOrder(a: Category, b: Category): number {
    return a.sortOrder - b.sortOrder;
  }

  private categoriesOfGroup(categories: Array<Category>): (group: Category) => TreeNode<Category> {
    return (group: Category) => {
      const children = categories
        .filter(category => category.parentId === group._id)
        .map(category => ({data: category, children: []}));
      return {
        data: group,
        children
      };
    };
  }
}
