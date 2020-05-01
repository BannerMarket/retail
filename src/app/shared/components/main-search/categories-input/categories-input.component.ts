import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {CategoriesService} from '../../../../core/services/categories.service';
import {take} from 'rxjs/operators';
import {TreeNode} from '../../../../core/models/tree.model';
import {Category} from '../../../../core/models/category.model';
import {LanguageService} from '../../../../core/services/language.service';
import {CategorySelectionComponent} from '../../reusable/category-selection/category-selection.component';

@Component({
  selector: 'app-categories-input',
  templateUrl: './categories-input.component.html',
  styleUrls: ['./categories-input.component.scss']
})
export class CategoriesInputComponent implements OnInit {

  @ViewChild(CategorySelectionComponent) categorySelection: CategorySelectionComponent;

  @Output() categories: EventEmitter<Array<Category>> = new EventEmitter();

  public _result = '';
  public focused = false;
  public groups: Array<TreeNode<Category>>;
  public _categories: Array<Category> = []

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
      });
  }

  public clear() {
    if (this.categorySelection) {
      this.categorySelection.clear();
    }
  }

  public onSelection(categories: Array<Category>): void {
    this._categories = categories;
    this.categories.emit(categories);

    const categoryNames = categories.map(category => category.name);

    this.languageService
      .translateArray(categoryNames)
      .pipe(take(1))
      .subscribe(translations => {
        this._result = translations.length > 0 ? translations.reduce((res, translation) => `${res}, ${translation}`) : '';
      });
  }
}
