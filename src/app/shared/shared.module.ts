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
import { TagInputComponent } from './components/main-search/tag-input/tag-input.component';
import { CheckboxComponent } from './components/reusable/checkbox/checkbox.component';
import { MinifiedMainSearchComponent } from './components/main-search/minified-main-search/minified-main-search.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    LanguageSelectorComponent,
    TranslatePipe,
    FormInputComponent,
    MainSearchComponent,
    LocationInputComponent,
    TagInputComponent,
    CheckboxComponent,
    MinifiedMainSearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    LanguageSelectorComponent,
    FormInputComponent,
    MainSearchComponent,
    CheckboxComponent,
  ]
})
export class SharedModule { }
