import { Injectable } from '@angular/core';
import { Ad } from '../models/ad';

@Injectable()
export class AdService {

  dummyAd: Ad[] = Ad.dummyAds;

  constructor() { }

  getAds(console: string, section = ''): Ad[] {
    if (console === '') {
      return [];
    }
    let tempAds: Ad[];
    if (console !== '') {
      tempAds = this.dummyAd.filter(ad => ad.console === console);
    }
    if (section !== '') {
      tempAds = tempAds.filter(ad => ad.section === section);
    }
    return tempAds;
  }

}
