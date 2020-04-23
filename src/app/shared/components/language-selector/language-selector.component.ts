import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {LanguageService} from '../../../core/services/language.service';
import {Language} from '../../../core/models/language';
import {Observable} from "rxjs";

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  public displayList = false;
  public Language = Language;
  public selectedLanguage: Observable<Language>;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    const clickedOutside = !this.eRef.nativeElement.contains(event.target);

    if (clickedOutside) {
      this.displayList = false;
    }
  }

  constructor(private eRef: ElementRef, private languageService: LanguageService) { }

  ngOnInit(): void {
    this.selectedLanguage = this.languageService.getSelectedLanguage();
  }

  public toggleList(): void {
    this.displayList = !this.displayList;
  }

  public setLanguage(language: Language): void {
    this.languageService.setLanguage(language);
    this.displayList = false;
  }
}
