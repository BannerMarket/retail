import {Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {CategoriesService} from '../../../../core/services/categories.service';
import {take} from 'rxjs/operators';
import {Tree, TreeNode} from '../../../../core/models/tree.model';
import {Category} from '../../../../core/models/category.model';
import {Utils} from '../../../../core/utils/utils';
import {LanguageService} from '../../../../core/services/language.service';

@Component({
  selector: 'app-categories-input',
  templateUrl: './categories-input.component.html',
  styleUrls: ['./categories-input.component.scss']
})
export class CategoriesInputComponent implements OnInit, OnDestroy {

  @Output() result: EventEmitter<Array<Category>> = new EventEmitter();

  private subscriptions: Array<Subscription> = [];
  private order: Array<string> = [];
  public categoriesFormGroup: FormGroup;
  public _result = '';
  public focused = false;
  public categories: Array<Category> = [];
  public groups: Array<TreeNode<Category>>;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    this.focused = this.eRef.nativeElement.contains(event.target);
  }

  constructor(private eRef: ElementRef, private categoryService: CategoriesService, private languageService: LanguageService) { }

  ngOnInit(): void {
    this.categoryService.getCategoryGroups()
      .pipe(take(1))
      .subscribe(groups => {
        this.groups = groups;
        this.categories = this.getCategories(groups);
        this.categoriesFormGroup = new FormGroup(this.getFormControls(groups));
        this.subscribeToChanges();
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public clear() {
    this.order.forEach(tag => this.categoriesFormGroup.controls[tag].patchValue(false));
    this.focused = false;
  }

  private getFormControls(groups: Tree<Category>): { [key: string]: AbstractControl } {
    return groups
      .map(group => group.children)
      .reduce(Utils.concatReducer, [])
      .map(node => node.data._id)
      .reduce((formControls, category) => ({...formControls, [category]: new FormControl(false)}), {});
  }

  private getSelectedCategoryOrder(values: { [key: string]: boolean }, order: Array<string>): Array<string>  {
    const isSelected = key => !!values[key];
    const sortOrder = key => order.includes(key) ? order.indexOf(key) : order.length;
    const sortFn = (a: string, b: string) => sortOrder(a) - sortOrder(b);

    return Array.from(Object.keys(values))
      .filter(isSelected)
      .sort(sortFn);
  }

  private subscribeToChanges(): void {
    this.subscriptions.push(this.categoriesFormGroup.valueChanges
      .subscribe(value => {
        this.order = this.getSelectedCategoryOrder(value, this.order);
        const categories = this.order
          .map(categoryId => this.categories.find(category => category._id === categoryId));

        this.result.emit(categories);
        this.displaySelection(categories.map(category => category.name));
      }));
  }

  private getCategories(groups: Array<TreeNode<Category>>): Array<Category> {
    return groups
      .map(group => group.children)
      .reduce(Utils.concatReducer, [])
      .map(category => category.data);
  }

  private displaySelection(categoryNames: Array<string>): void {
    this.languageService
      .translateArray(categoryNames)
      .pipe(take(1))
      .subscribe(translations => {
        this._result = translations.length > 0 ? translations.reduce((res, translation) => `${res}, ${translation}`) : '';
      });
  }
}
