import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MapSuggestion} from '../../../models/map-suggestion.model';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {DataService} from '../../../../core/services/data.service';
import {Urls} from '../../../../../assets/configs/urls';
import {LanguageService} from '../../../../core/services/language.service';
import {Language} from '../../../../core/models/language';

const DEFAULT_SUGGESTIONS_EN: Array<MapSuggestion> = [
  {
    description: 'Tbilisi',
    id: 'ChIJa2JP5tcMREARo25X4u2E0GE'
  },
  {
    description: 'Chavchavadze ave',
    // tslint:disable-next-line:max-line-length
    id: 'ElPhg5jhg5rhg5jhg5Ag4YOt4YOQ4YOV4YOt4YOQ4YOV4YOQ4YOr4YOY4YOhIOGDkuGDkOGDm-GDluGDmOGDoOGDmCwgVGJpbGlzaSwgR2VvcmdpYSIuKiwKFAoSCS--WjUyc0RAEZSxs_zDnbtsEhQKEglrYk_m1wxEQBGjblfi7YTQYQ'
  },
  {
    description: 'Vazha-pshavela ave',
    // tslint:disable-next-line:max-line-length
    id: 'Ek3hg5Xhg5Dhg5_hg5At4YOk4YOo4YOQ4YOV4YOU4YOa4YOQ4YOhIOGDkuGDkOGDm-GDluGDmOGDoOGDmCwgVGJpbGlzaSwgR2VvcmdpYSIuKiwKFAoSCWuR3EEOc0RAEas8vsKCjQU3EhQKEglrYk_m1wxEQBGjblfi7YTQYQ'
  },
  {
    description: 'Mikheil tamarashvili ave',
    // tslint:disable-next-line:max-line-length
    id: 'Elbhg5vhg5jhg67hg5Thg5jhg5og4YOX4YOQ4YOb4YOQ4YOg4YOQ4YOo4YOV4YOY4YOa4YOY4YOhIOGDpeGDo-GDqeGDkCwgVGJpbGlzaSwgR2VvcmdpYSIuKiwKFAoSCSGg004Wc0RAEVPaNDsZQFcaEhQKEglrYk_m1wxEQBGjblfi7YTQYQ'
  },
  {
    description: 'Khazbegi ave',
    // tslint:disable-next-line:max-line-length
    id: 'EkDhg6fhg5Dhg5bhg5Hhg5Thg5Lhg5jhg6Eg4YOS4YOQ4YOb4YOW4YOY4YOg4YOYLCBUYmlsaXNpLCBHZW9yZ2lhIi4qLAoUChIJAbBNyx5zREARSG6KB8ceZjMSFAoSCWtiT-bXDERAEaNuV-LthNBh'
  }
];

const DEFAULT_SUGGESTIONS_GE: Array<MapSuggestion> = [
  {
    description: 'თბილისი',
    id: 'ChIJa2JP5tcMREARo25X4u2E0GE'
  },
  {
    description: 'ჭავჭავაძის გამზირი',
    // tslint:disable-next-line:max-line-length
    id: 'ElPhg5jhg5rhg5jhg5Ag4YOt4YOQ4YOV4YOt4YOQ4YOV4YOQ4YOr4YOY4YOhIOGDkuGDkOGDm-GDluGDmOGDoOGDmCwgVGJpbGlzaSwgR2VvcmdpYSIuKiwKFAoSCS--WjUyc0RAEZSxs_zDnbtsEhQKEglrYk_m1wxEQBGjblfi7YTQYQ'
  },
  {
    description: 'ვაჟა-ფშაველას გამზირი',
    // tslint:disable-next-line:max-line-length
    id: 'Ek3hg5Xhg5Dhg5_hg5At4YOk4YOo4YOQ4YOV4YOU4YOa4YOQ4YOhIOGDkuGDkOGDm-GDluGDmOGDoOGDmCwgVGJpbGlzaSwgR2VvcmdpYSIuKiwKFAoSCWuR3EEOc0RAEas8vsKCjQU3EhQKEglrYk_m1wxEQBGjblfi7YTQYQ'
  },
  {
    description: 'მიხეილ თამარაშვილის გამზირი',
    // tslint:disable-next-line:max-line-length
    id: 'Elbhg5vhg5jhg67hg5Thg5jhg5og4YOX4YOQ4YOb4YOQ4YOg4YOQ4YOo4YOV4YOY4YOa4YOY4YOhIOGDpeGDo-GDqeGDkCwgVGJpbGlzaSwgR2VvcmdpYSIuKiwKFAoSCSGg004Wc0RAEVPaNDsZQFcaEhQKEglrYk_m1wxEQBGjblfi7YTQYQ'
  },
  {
    description: 'ყაზბეგის გამზირი',
    // tslint:disable-next-line:max-line-length
    id: 'EkDhg6fhg5Dhg5bhg5Hhg5Thg5Lhg5jhg6Eg4YOS4YOQ4YOb4YOW4YOY4YOg4YOYLCBUYmlsaXNpLCBHZW9yZ2lhIi4qLAoUChIJAbBNyx5zREARSG6KB8ceZjMSFAoSCWtiT-bXDERAEaNuV-LthNBh'
  }
];

@Injectable({
  providedIn: 'root'
})
export class MapSuggestionsService {

  private readonly MAX_SUGGESTION_COUNT = 5;

  constructor(private dataService: DataService,
              private languageService: LanguageService) { }

  public getSuggestions(queries: Observable<{input: string, sessiontoken: string}>): Observable<Array<MapSuggestion>> {
    return queries.pipe(
        debounceTime(500),
        switchMap(data => this.fetchSuggestions(data.input, data.sessiontoken)),
        map(suggestions => this.limitSuggestions(suggestions))
      );
  }

  private fetchSuggestions(input: string, sessiontoken: string): Observable<Array<MapSuggestion>> {
    if (input) {
      return this.dataService
        .get(`${Urls.PLACE_SUGGESTIONS}/${sessiontoken}/${input}`);
    }

    return this.languageService.getSelectedLanguage()
      .pipe(map(language => {
        if (language === Language.ge) {
          return DEFAULT_SUGGESTIONS_GE;
        }
        return DEFAULT_SUGGESTIONS_EN;
      }));
  }

  private limitSuggestions(suggestions: Array<MapSuggestion>): Array<MapSuggestion> {
    return suggestions.slice(0, this.MAX_SUGGESTION_COUNT);
  }
}
