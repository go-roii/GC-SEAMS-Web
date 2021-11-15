import { TestBed } from '@angular/core/testing';

import { SidenavExpandService } from './sidenav-expand.service';

describe('SidenavExpandService', () => {
  let service: SidenavExpandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavExpandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
