import { Injectable } from '@angular/core';
import { Ad } from '../models/ad';
import { User } from '../models/user';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AdService {

  dummyAd: Ad[] = Ad.dummyAds;

  constructor(private firebaseService: FirebaseService) { }

  getAd(key: string): Promise<Ad> {
    return Promise.resolve(
      this.firebaseService.database.ref('ads/' + key).once('value').then((snapshot) => {
        return snapshot.val();
      })
    );
  }

  getAds(console: string, section = ''): Promise<Ad[]> {
    if (console === '') {
      return Promise.resolve([]);
    }
    return Promise.resolve(this.getAdsByConsole(console).then((ads) => {
      if (section !== '') {
        return this.getAdsBySection(section, ads);
      }
      return ads;
    }));
  }

  getAdsByConsole(console: string): Promise<Ad[]> {
    return Promise.resolve(
      this.firebaseService.database.ref('ads').orderByChild('console').equalTo(console).once('value').then((snapshot) => {
        let ads: Ad[] = [];
        snapshot.forEach((childSnapshot) => {
          let ad: Ad = childSnapshot.val();
          ad.id = childSnapshot.key;
          ads.push(ad);
        });
        return ads;
      })
    );
  }

  getAdsBySection(section: string, ads: Ad[]): Ad[] {
    return ads.filter(ad => ad.section === section);
  }

  getUserAds(user: User): Promise<Ad[]>{
    return Promise.resolve(
      this.firebaseService.database.ref('/user-ads/' + user.id + '/').once('value').then((snapshot) => {
        let ads: Ad[] = [];
        snapshot.forEach((childSnapshot) => {
          let ad: Ad = childSnapshot.val();
          ad.id = childSnapshot.key;
          ads.push(ad);
        });
        return ads;
      })
    );
  }

  saveAd(ad: Ad, user: User): Promise<any>{
    // Get a key for a new Post.
    let newPostKey = this.firebaseService.database.ref().child('ads').push().key;
    let updates = {
      ['/ads/' + newPostKey]: ad,
      ['/user-ads/' + user.id + '/' + newPostKey]: ad
    };

    return Promise.resolve(this.firebaseService.database.ref().update(updates));
  }

  deleteAd() {

  }

}
