import { TestBed } from '@angular/core/testing';

import { NewEventsService } from './new-events.service';

describe('NewEventsService', () => {
  let service: NewEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
