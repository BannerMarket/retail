import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Tree, TreeNode} from '../../../../core/models/tree.model';
import {Category} from '../../../../core/models/category.model';
import {Utils} from '../../../../core/utils/utils';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.scss']
})
export class CategorySelectionComponent implements OnInit, OnDestroy {

  @Input() set groups(groups: Array<TreeNode<Category>>) {
    this._groups = groups;
    this.categories = this.getCategories(groups);
    this.categoriesFormGroup = new FormGroup(this.getFormControls(groups));
    this.subscribeToChanges();
  }

  @Input() set selected(categories: Array<Category>) {
    if (this.categoriesFormGroup && Array.isArray(categories)) {
      const selectedIds = new Set(categories.map(category => category._id));

      Object.keys(this.categoriesFormGroup.controls)
        .forEach(id => {
          const control = this.categoriesFormGroup.controls[id];
          control.patchValue(selectedIds.has(id));
        });
    }
  }

  @Output() select: EventEmitter<Array<Category>> = new EventEmitter<Array<Category>>();

  public _groups: Array<TreeNode<Category>>;
  public categoriesFormGroup: FormGroup;
  public categories: Array<Category> = [];

  private order: Array<string> = [];
  private subscriptions: Array<Subscription> = [];

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public clear(): void {
    Object.values(this.categoriesFormGroup.controls).forEach(control => control.patchValue(false));
  }

  private getCategories(groups: Array<TreeNode<Category>>): Array<Category> {
    return groups
      .map(group => group.children)
      .reduce(Utils.concatReducer, [])
      .map(category => category.data);
  }

  private getFormControls(groups: Tree<Category>): { [key: string]: AbstractControl } {
    return groups
      .map(group => group.children)
      .reduce(Utils.concatReducer, [])
      .map(node => node.data._id)
      .reduce((formControls, category) => ({...formControls, [category]: new FormControl(false)}), {});
  }

  private subscribeToChanges(): void {
    this.subscriptions.push(this.categoriesFormGroup.valueChanges
      .subscribe(value => {
        this.order = this.getSelectedCategoryOrder(value, this.order);
        this.select.next(this.order.map(id => this.categories.find(category => category._id === id)));
      }));
  }

  private getSelectedCategoryOrder(values: { [key: string]: boolean }, order: Array<string>): Array<string>  {
    const isSelected = key => !!values[key];
    const sortOrder = key => order.includes(key) ? order.indexOf(key) : order.length;
    const sortFn = (a: string, b: string) => sortOrder(a) - sortOrder(b);

    return Array.from(Object.keys(values))
      .filter(isSelected)
      .sort(sortFn);
  }
}
