import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/reusable/button/button.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { FormInputComponent } from './components/reusable/form-input/form-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MainSearchComponent } from './components/main-search/main-search.component';
import { LocationInputComponent } from './components/main-search/location-input/location-input.component';
import { CheckboxComponent } from './components/reusable/checkbox/checkbox.component';
import { MinifiedMainSearchComponent } from './components/main-search/minified-main-search/minified-main-search.component';
import { CategoriesInputComponent } from './components/main-search/categories-input/categories-input.component';
import { CategorySelectionComponent } from './components/reusable/category-selection/category-selection.component';
import {RouterModule} from '@angular/router';
import { PaginatorComponent } from './components/reusable/paginator/paginator.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    LanguageSelectorComponent,
    TranslatePipe,
    FormInputComponent,
    MainSearchComponent,
    LocationInputComponent,
    CheckboxComponent,
    MinifiedMainSearchComponent,
    CategoriesInputComponent,
    CategorySelectionComponent,
    PaginatorComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        ButtonComponent,
        LanguageSelectorComponent,
        FormInputComponent,
        MainSearchComponent,
        CheckboxComponent,
        TranslatePipe,
        PaginatorComponent,
    ]
})
export class SharedModule { }
