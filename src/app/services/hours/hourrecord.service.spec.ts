import { TestBed } from '@angular/core/testing';

import { HourrecordService } from './hourrecord.service';

describe('HourrecordService', () => {
  let service: HourrecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HourrecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
