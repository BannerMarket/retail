import { TestBed } from '@angular/core/testing';

import { BannerOrderService } from './banner-order.service';

describe('BannerOrderService', () => {
  let service: BannerOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
