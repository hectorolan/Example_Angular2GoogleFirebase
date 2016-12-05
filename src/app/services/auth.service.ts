import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Router, NavigationExtras } from '@angular/router';
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
export class AuthService {
  user = new User();
  isLoggedIn: boolean;
  redirectUrl: string;

  constructor(private router: Router) {
    firebase.initializeApp(firebaseConfig);
  }

  login(): any {
  }

  loginGoogle(): any {
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithRedirect(provider);

    /* return this.firebase.auth.login()
      .then((success) => {
        this.isLoggedIn = true;
        this.subscribe();
      })
      .catch((fail) => {
        this.isLoggedIn = false;
      });*/
  }

  logout(): void {
    firebase.auth().signOut().then(() => {
      this.user = new User();
      this.isLoggedIn = false;
    }, 
    (error) => {
      console.log(error);
    });
  }

  checkIfLoggedIn(): any {
    return firebase.auth().getRedirectResult().then((result) => {
      this.user.accessToken = result.credential.accessToken;
      this.isLoggedIn = true;
      this.user.name = result.user.displayName;
      this.user.email = result.user.email;
      this.user.avatarURL = result.user.photoURL;
      this.router.navigate(['/admin']);
    }).catch((error: any) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(error);
    });
  }
}
