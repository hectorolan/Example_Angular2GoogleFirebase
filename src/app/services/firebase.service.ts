import { Injectable } from '@angular/core';
import { User } from '../models/user';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA7cHIY_mihlnv4xefUsQEGE6xoxuwyn7k',
  authDomain: 'gamesclasificados.firebaseapp.com',
  databaseURL: 'https://gamesclasificados.firebaseio.com',
  storageBucket: 'gamesclasificados.appspot.com',
  messagingSenderId: '292788060773'
};

@Injectable()
export class FirebaseService {
  user: User = new User();
  firebase: any;
  auth: any;
  database: any;
  storage: any;

  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.firebase = firebase;
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  GoogleAuthProvider(): any {
    return new firebase.auth.GoogleAuthProvider();
  }

  EmailAuthProvider(): any {
    return firebase.auth.EmailAuthProvider;
  }

}
