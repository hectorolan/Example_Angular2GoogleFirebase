import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Router, NavigationExtras } from '@angular/router';
import { User } from '../models/user';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';

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
  isLoggedIn: boolean = false;
  redirectUrl: string;

  constructor(private router: Router, private firebaseService: FirebaseService, private userService: UserService) { }

  login(email: string, password: string): Promise<any> {
    return Promise.resolve(
    this.firebaseService.auth.signInWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      return(error.code);
    }));
  }

  loginGoogle(): any {
    let provider = this.firebaseService.GoogleAuthProvider();
    return this.firebaseService.auth.signInWithRedirect(provider);
  }

  logout(): void {
    this.firebaseService.auth.signOut().then(() => {
      this.user = new User();
      this.isLoggedIn = false;
      this.router.navigate(['/games']);
      location.reload();
    },
    (error) => {
      console.log(error);
    });
  }

  checkIfLoggedIn(): Promise<any> {
    return Promise.resolve().then(() => {
      if (this.isLoggedIn) {
        return true;
      }
      return Promise.resolve(this.refreshFireBaseVariables());
    }).then(() => {
      if (this.isLoggedIn) {
        return true;
      }
      return Promise.resolve(this.getFirebaseRedirectResult());
    });
  }

  getFirebaseRedirectResult(): Promise<any> {
    return Promise.resolve().then(() => {
      return this.firebaseService.auth.getRedirectResult().then((result) => {
        if (result.user) {
          return Promise.resolve(this.userService.getUser(result.user.uid)).then((user) => {
              this.isLoggedIn = true;
              if (user) {
                this.user = user;
              } else {
                this.user.accessToken = result.credential.accessToken;
                this.user.name = result.user.displayName;
                this.user.email = result.user.email;
                this.user.avatarURL = result.user.photoURL;
                this.user.id = result.user.uid;
                return Promise.resolve(this.userService.saveUser(this.user));
              }
          });
        }
      }).catch((error: any) => {
        console.log(error);
      })
    });
  }

  refreshFireBaseVariables(): Promise<any> {
    return Promise.resolve().then(() => {
        if (this.firebaseService.auth.currentUser) {
          return Promise.resolve(this.userService.getUser(this.firebaseService.auth.currentUser.uid)).then((user) => {
            if (user) {
              this.isLoggedIn = true;
              this.user = user;
            }
          });
        }
    });
  }
}
