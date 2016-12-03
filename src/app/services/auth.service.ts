import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState  } from 'angularfire2';
import { User } from '../models/user';


@Injectable()
export class AuthService {
  user = new User();
  isLoggedIn: boolean;
  redirectUrl: string;

  constructor(private firebase: AngularFire) { }

  login(): any {
  }

  loginGoogle(): any {
    return this.firebase.auth.login()
      .then((success) => {
        this.isLoggedIn = true;
        this.subscribe();
      })
      .catch((fail) => {
        this.isLoggedIn = false;
      });
  }

  logout(): void {
    this.firebase.auth.logout();
    this.firebase.auth.unsubscribe();
    this.user = new User();
    this.isLoggedIn = false;
  }

  subscribe() {
    this.firebase.auth.subscribe((auth) => {
      if (auth) {
        this.user.name = auth.auth.displayName;
        this.user.email = auth.auth.email;
        this.user.avatarURL = auth.auth.photoURL;
      }
    });
  }
}
