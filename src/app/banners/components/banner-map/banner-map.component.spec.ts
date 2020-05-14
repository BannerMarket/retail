import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerMapComponent } from './banner-map.component';

describe('BannerMapComponent', () => {
  let component: BannerMapComponent;
  let fixture: ComponentFixture<BannerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
