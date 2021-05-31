import { TestBed } from '@angular/core/testing';

import { ApiethvmService } from './apiethvm.service';

describe('ApiethvmService', () => {
  let service: ApiethvmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiethvmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
