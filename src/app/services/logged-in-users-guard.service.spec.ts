import { TestBed } from '@angular/core/testing';

import { LoggedInUsersGuardService } from './logged-in-users-guard.service';

describe('LoggedInUsersGuardService', () => {
  let service: LoggedInUsersGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedInUsersGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
