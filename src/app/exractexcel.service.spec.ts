import { TestBed } from '@angular/core/testing';

import { ExractexcelService } from './exractexcel.service';

describe('ExractexcelService', () => {
  let service: ExractexcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExractexcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
