import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { servicerGuard } from './servicer.guard';

describe('servicerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => servicerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
