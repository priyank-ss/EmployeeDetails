import { TestBed } from '@angular/core/testing';

import { GetEmployeeListsService } from './get-employee-lists.service';

describe('GetEmployeeListsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetEmployeeListsService = TestBed.get(GetEmployeeListsService);
    expect(service).toBeTruthy();
  });
});
