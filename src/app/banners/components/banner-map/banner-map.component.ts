import {Component, Input, OnInit} from '@angular/core';
import {Banner} from '../../../shared/models/banner.model';

@Component({
  selector: 'app-banner-map',
  templateUrl: './banner-map.component.html',
  styleUrls: ['./banner-map.component.scss']
})
export class BannerMapComponent implements OnInit {

  @Input() banners: Array<Banner> = [];

  @Input() set lat(lat) {
    this.center.lat = lat;
  }

  @Input() set lng(lng) {
    this.center.lng = lng;
  }

  zoom = 17;
  center: google.maps.LatLngLiteral = {
    lat: 41.7222148,
    lng: 44.7584373
  };
  options: google.maps.MapOptions = {
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 19,
    minZoom: 13,
    fullscreenControl: false,
    streetViewControl: false,
  };

  constructor() { }

  ngOnInit() { }

}
