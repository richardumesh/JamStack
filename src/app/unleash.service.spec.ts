import { TestBed } from '@angular/core/testing';

import { UnleashService } from './unleash.service';

describe('UnleashService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnleashService = TestBed.get(UnleashService);
    expect(service).toBeTruthy();
  });
});
