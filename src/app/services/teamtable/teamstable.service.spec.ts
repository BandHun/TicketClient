import { TestBed } from '@angular/core/testing';

import { TeamstableService } from './teamstable.service';

describe('TeamstableService', () => {
  let service: TeamstableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamstableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
