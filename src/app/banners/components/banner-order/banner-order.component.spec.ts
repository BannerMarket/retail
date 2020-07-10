import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerOrderComponent } from './banner-order.component';

describe('BannerOrderComponent', () => {
  let component: BannerOrderComponent;
  let fixture: ComponentFixture<BannerOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
