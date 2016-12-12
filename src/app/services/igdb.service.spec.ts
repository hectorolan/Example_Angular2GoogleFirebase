/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IgdbService } from './igdb.service';

describe('Service: Igdb', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IgdbService]
    });
  });

  it('should ...', inject([IgdbService], (service: IgdbService) => {
    expect(service).toBeTruthy();
  }));
});
