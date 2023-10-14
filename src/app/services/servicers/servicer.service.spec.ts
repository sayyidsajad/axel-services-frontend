import { TestBed } from '@angular/core/testing';

import { ServicerService } from './servicer.service';

describe('ServicerService', () => {
  let service: ServicerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
