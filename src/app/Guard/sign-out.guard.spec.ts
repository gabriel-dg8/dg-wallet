import { TestBed } from '@angular/core/testing';

import { SignOutGuard } from './sign-out.guard';

describe('SignOutGuard', () => {
  let guard: SignOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
