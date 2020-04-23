import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public scrolled = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.pageYOffset > 0;
  }

  constructor() { }

  ngOnInit(): void { }

}
