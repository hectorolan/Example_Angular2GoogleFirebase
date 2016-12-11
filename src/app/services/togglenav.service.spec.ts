/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TogglenavService } from './togglenav.service';

describe('Service: Togglenav', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TogglenavService]
    });
  });

  it('should ...', inject([TogglenavService], (service: TogglenavService) => {
    expect(service).toBeTruthy();
  }));
});
