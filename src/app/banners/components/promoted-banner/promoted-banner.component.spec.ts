import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotedBannerComponent } from './promoted-banner.component';

describe('PromotedBannerComponent', () => {
  let component: PromotedBannerComponent;
  let fixture: ComponentFixture<PromotedBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotedBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotedBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
