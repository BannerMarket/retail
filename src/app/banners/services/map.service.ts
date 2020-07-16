import { Injectable } from '@angular/core';
import {Banner} from '../../shared/models/banner.model';
import {Directions} from '../../shared/models/directions.model';
import {Utils} from '../../core/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  public getCenter(banners: Array<Banner>): Directions {
    return this.getClosestDirections(banners);
  }

  private getClosestDirections(banners: Array<Banner>): Directions {
    return {lat: banners[0].lat, lng: banners[0].lng};
  }

  private getMeanDirections(banners: Array<Banner>): Directions {
    const topmost = this.getTopmost(banners);
    const bottommost = this.getBottommost(banners);
    const leftmost = this.getLeftmost(banners);
    const rightmost = this.getRightmost(banners);

    return {lat: Utils.mean(topmost, bottommost), lng: Utils.mean(leftmost, rightmost)};
  }

  private getTopmost(banners: Array<Banner>): number {
    const isHigher = (a: Banner, b: Banner) => b.lat > a.lat;
    return banners
      .reduce((topmostBanner, curr) => isHigher(topmostBanner, curr) ? curr : topmostBanner).lat;
  }

  private getBottommost(banners: Array<Banner>): number {
    const isLower = (a: Banner, b: Banner) => b.lat < a.lat;
    return banners
      .reduce((topmostBanner, curr) => isLower(topmostBanner, curr) ? curr : topmostBanner).lat;
  }

  private getLeftmost(banners: Array<Banner>): number {
    const isLeft = (a: Banner, b: Banner) => b.lng < a.lng;
    return banners
      .reduce((topmostBanner, curr) => isLeft(topmostBanner, curr) ? curr : topmostBanner).lng;
  }

  private getRightmost(banners: Array<Banner>): number {
    const isRight = (a: Banner, b: Banner) => b.lng > a.lng;
    return banners
      .reduce((topmostBanner, curr) => isRight(topmostBanner, curr) ? curr : topmostBanner).lng;
  }
}
