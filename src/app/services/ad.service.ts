import { Injectable } from '@angular/core';
import { Ad } from '../models/ad';

@Injectable()
export class AdService {

  dummyAd: Ad[] = Ad.dummyAds;

  constructor() { }

  getAds(console: string, section: string = ""){

  }

}
