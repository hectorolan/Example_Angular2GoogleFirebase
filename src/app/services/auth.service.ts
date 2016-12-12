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
  isLoggedIn: boolean;
  redirectUrl: string;

  constructor(private router: Router, private firebaseService: FirebaseService, private userService: UserService) {
    this.isLoggedIn = false;
  }

  login(): any {
  }

  loginGoogle(): any {
    var provider = this.firebaseService.GoogleAuthProvider();
    return this.firebaseService.auth.signInWithRedirect(provider);
  }

  logout(): void {
    this.firebaseService.auth.signOut().then(() => {
      this.user = new User();
      this.isLoggedIn = false;
      this.router.navigate(['/games']);
    }, 
    (error) => {
      console.log(error);
    });
  }

  checkIfLoggedIn(): Promise<any> {
    return Promise.resolve(
      this.firebaseService.auth.getRedirectResult().then((result) => {
        if (result.user) {
          this.user.accessToken = result.credential.accessToken;
          this.isLoggedIn = true;
          this.user.name = result.user.displayName;
          this.user.email = result.user.email;
          this.user.avatarURL = result.user.photoURL;
          this.user.id = result.user.uid;
          return Promise.resolve(this.userService.getUser(this.user)).then((user) => {
              if (user) {
                this.user = user;
              } else {
                return Promise.resolve(this.userService.saveUser(this.user));
              }
          });
        }
      }).catch((error: any) => {
        console.log(error);
      })
    );
  }
}
