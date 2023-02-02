import { TestBed } from '@angular/core/testing';

import { Shared.ServiceService } from './shared.service';

describe('Shared.ServiceService', () => {
  let service: Shared.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Shared.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
