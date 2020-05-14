import { TestBed } from '@angular/core/testing';

import { BannerFilterService } from './banner-filter.service';

describe('BannerFilterService', () => {
  let service: BannerFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
