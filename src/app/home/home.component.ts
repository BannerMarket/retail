import { Component, OnInit } from '@angular/core';
import {DataService} from '../core/services/data.service';
import {Urls} from '../../assets/configs/urls';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public images: Array<string> = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.get(Urls.HERO_IMAGES)
      .pipe(take(1))
      .subscribe(response => this.images = response.map(file => file.path));
  }

}
