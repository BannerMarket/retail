import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from 'rxjs';
import {LanguageService} from '../../core/services/language.service';
import {map} from 'rxjs/operators';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private languageService: LanguageService) { }

  transform(key: string): Observable<string> {
    return this.languageService
      .translate(key)
      .pipe(map(result => result ? result : key));
  }

}
