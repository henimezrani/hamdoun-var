import { TestBed } from '@angular/core/testing';

import { AnyService } from './any.service';

describe('AnyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnyService = TestBed.get(AnyService);
    expect(service).toBeTruthy();
  });
});
