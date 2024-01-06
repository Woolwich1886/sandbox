import { TestBed } from '@angular/core/testing';

import { SpherePageService } from './sphere-page.service';

describe('SpherePageService', () => {
  let service: SpherePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpherePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
