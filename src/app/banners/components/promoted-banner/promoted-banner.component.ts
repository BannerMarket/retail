import {Component, Input, OnInit} from '@angular/core';
import {Banner} from '../../../shared/models/banner.model';

@Component({
  selector: 'app-promoted-banner',
  templateUrl: './promoted-banner.component.html',
  styleUrls: ['./promoted-banner.component.scss']
})
export class PromotedBannerComponent implements OnInit {

  @Input() banner: Banner;

  constructor() { }

  ngOnInit(): void {
  }

}
