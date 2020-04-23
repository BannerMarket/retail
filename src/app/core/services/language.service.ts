import { Injectable } from '@angular/core';
import {Language} from '../models/language';
import {BehaviorSubject, Observable} from 'rxjs';
import {DataService} from './data.service';
import {Urls} from '../../../assets/configs/urls';
import {map, take} from 'rxjs/operators';
import {LocalStorage} from "../global/local-storage";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly DEFAULT_LANGUAGE = Language.ge;
  private readonly LOCAL_STORAGE_KEY = 'LANG';

  private readonly dictionary: BehaviorSubject<object>;
  private readonly selectedLanguage: BehaviorSubject<Language>;

  constructor(private dataService: DataService) {
    this.selectedLanguage = this.getInitialLanguage(this.DEFAULT_LANGUAGE);
    this.dictionary = new BehaviorSubject<object>({});
    this.getDictionary(this.selectedLanguage.getValue());
  }

  public getSelectedLanguage(): Observable<Language> {
    return this.selectedLanguage;
  }

  public translate(key: string): Observable<string> {
    return this.dictionary
      .pipe(map(dictionary => dictionary[key] ? dictionary[key] : ''));
  }

  public setLanguage(language: Language): void {
    if (language === this.selectedLanguage.getValue()) {
      return;
    }

    this.selectedLanguage.next(language);
    this.getDictionary(language);

    try {
      LocalStorage.setItem(this.LOCAL_STORAGE_KEY, language);
    } catch (e) {
      console.error(e);
    }
  }

  private getInitialLanguage(defaultLanguage: Language): BehaviorSubject<Language> {
    try {
      const language = LocalStorage.getItem(this.LOCAL_STORAGE_KEY);

      if (language && language === Language.ge || language === Language.en) {
        return new BehaviorSubject<Language>(language);
      }
    } catch (e) {
      console.error(e);
    }

    return new BehaviorSubject<Language>(defaultLanguage);
  }

  private getDictionary(language: Language): void {
    this.dataService.get(Urls.DICTIONARY, {language})
      .pipe(take(1))
      .subscribe(dictionary => {
        if (dictionary) {
          this.dictionary.next(dictionary);
        }
      }, error => console.error(error));
  }
}
