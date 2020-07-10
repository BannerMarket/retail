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
import { CarouselComponent } from './components/reusable/carousel/carousel.component';
import {NgxHmCarouselModule} from 'ngx-hm-carousel';
import {InputComponent} from './components/reusable/input/input.component';
import {ModalComponent} from './components/reusable/modal/modal.component';
import {NotificationsComponent} from './components/reusable/notifications/notifications.component';
import {NotificationComponent} from './components/reusable/notifications/notification/notification.component';


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
    CarouselComponent,
    InputComponent,
    ModalComponent,
    NotificationsComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxHmCarouselModule
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
    CarouselComponent,
    InputComponent,
    ModalComponent,
    NotificationsComponent,
    NotificationComponent,
  ]
})
export class SharedModule { }
