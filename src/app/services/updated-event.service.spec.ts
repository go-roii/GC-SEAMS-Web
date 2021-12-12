import { TestBed } from '@angular/core/testing';

import { UpdatedEventService } from './updated-event.service';

describe('UpdatedEventService', () => {
  let service: UpdatedEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatedEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
