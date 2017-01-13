import { Injectable } from '@angular/core';
import { Ad } from '../models/ad';
import { User } from '../models/user';
import { FirebaseService } from './firebase.service';
import { Observable }    from 'rxjs/Observable';

@Injectable()
export class AdService {
  lastImageUploadedURL = '';

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

  saveAd(ad: Ad, user: User, adImageFile: File): Promise<any> {
    // Save the file/image to storage if file is not null
    if (adImageFile != null) {
      return Promise.resolve(
        this.uploadFile(adImageFile)
        .forEach((process: number) => { console.log(process); })
        .then(() => {
          ad.imageKey = this.lastImageUploadedURL !== '' ? this.lastImageUploadedURL : ad.imageKey;
          this.lastImageUploadedURL = '';
          return this.saveAd_ToDatabase(ad, user);
        })
      );
    }
    return this.saveAd_ToDatabase(ad, user);
  }

  private saveAd_ToDatabase(ad: Ad, user: User): Promise<any> {
    // Get a key for a new Post.
    let newPostKey = this.firebaseService.database.ref().child('ads').push().key;
    ad.id = newPostKey;
    let updates = {
      ['/ads/' + newPostKey]: ad,
      ['/user-ads/' + user.id + '/' + newPostKey]: ad
    };
    return Promise.resolve(this.firebaseService.database.ref().update(updates));
  }

  deleteAd(ad: Ad, user: User) {
    ad.deleted = true;
    let updates = {
      ['/ads/' + ad.id]: null,
      ['/user-ads/' + user.id + '/' + ad.id]: ad
    };
    return Promise.resolve(this.firebaseService.database.ref().update(updates));
  }

  uploadFile(file: File): Observable<any> {
    return new Observable(observer => {
      // Upload file and metadata to the object 'images/mountains.jpg'
      let uploadTask = this.firebaseService.storage.ref().child('images/' + new Date().getTime()).put(file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(this.firebaseService.firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          observer.next({'progress': progress});
        },
        (error) => { },
        () => {
          this.lastImageUploadedURL = uploadTask.snapshot.downloadURL;
          observer.complete();
      });
    });
  }

}
