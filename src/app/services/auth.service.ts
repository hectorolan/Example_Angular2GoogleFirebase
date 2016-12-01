import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState  } from 'angularfire2';


@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string;

  constructor(private firebase: AngularFire) { }

  login(): any {
    return this.firebase.auth.login()
      .then((success) => {
        this.isLoggedIn = true;
        return true;
      })
      .catch((fail) => {
        this.isLoggedIn = false;
        return false;
      });
  }

  logout(): void {
    this.firebase.auth.logout();
    this.isLoggedIn = false;
  }

  getEmail(): string {
    let auth = this.firebase.auth.getAuth();
    if (auth) {
      return auth.auth.email ? auth.auth.email : '';
    }
    return '';
  }

  getdisplayName(): string {
    let auth = this.firebase.auth.getAuth();
    if (auth) {
      return auth.auth.displayName ? auth.auth.displayName : '';
    }
    return '';
  }

}
