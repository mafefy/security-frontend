import { TestBed } from '@angular/core/testing';

import { ContourService } from './contour.service';

describe('ContourService', () => {
  let service: ContourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
