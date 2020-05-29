import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = [];
  public scrolled = false;
  public withSmallMargin = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.pageYOffset > 0;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    const s: Subscription = this.router.events
      .subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.withSmallMargin = val['url'] && val['url'].includes('banners');
        }
    });
    this.subscriptions.push(s);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
