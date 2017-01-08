import { Injectable, NgZone } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  user = new User();
  isLoggedIn: boolean = false;
  redirectUrl: string;

  constructor(private router: Router, private firebaseService: FirebaseService, private userService: UserService, private ngzone: NgZone) {
    this.firebaseService.auth.onAuthStateChanged((user) => {
      if (user) {
        if (!this.isLoggedIn) {
          // this.refreshFireBaseVariables()
          this.ngzone.run(() => this.refreshFireBaseVariables());
        }
      } else {
        // No user is signed in.
      }
    });
   }

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

  reautenticateUser(email: string, password: string): Promise<any> {
    const credential = this.firebaseService.EmailAuthProvider().credential(
        email,
        password
    );
    return Promise.resolve(this.firebaseService.auth.currentUser.reauthenticate(credential).then(() => {
        return true;
      }, (error) => {
        return false;
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

  isEmailVerified(): boolean {
    if (this.firebaseService.auth.currentUser) {
      return this.firebaseService.auth.currentUser.emailVerified;
    }
    return false;
  }

  checkIfLoggedIn(): Promise<any> {
    return Promise.resolve().then(() => {
      if (this.isLoggedIn) {
        return true;
      }
      return this.refreshFireBaseVariables().then(() => {
        if (this.isLoggedIn) {
          return true;
        }
        return this.getFirebaseRedirectResult();
      });
    });
  }

  refreshFireBaseVariables(): Promise<any> {
    return Promise.resolve().then(() => {
        if (this.firebaseService.auth.currentUser) {
          return this.userService.getUser(this.userService.getUserUid()).then((user) => {
            if (user) {
              this.isLoggedIn = true;
              this.user = user;
            }
          });
        }
    });
  }

  getFirebaseRedirectResult(): Promise<any> {
    return Promise.resolve(
      this.firebaseService.auth.getRedirectResult().then((result) => {
        if (result) {
          return this.userService.getUser(result.user.uid).then((user) => {
              this.isLoggedIn = true;
              if (user) {
                this.user = user;
              } else {
                // First Time, create user on db
                this.user.accessToken = result.credential.accessToken;
                this.user.name = result.user.displayName;
                this.user.avatarURL = result.user.photoURL;
                this.user.id = result.user.uid;
                return this.userService.saveUser(this.user);
              }
          });
        }
      }).catch((error: any) => {
        console.log(error);
      }));
  }

  updateAuthorizationEmail(email: string, originalEmail: string, password: string): Promise<any> {
    return this.reautenticateUser(originalEmail, password).then((reautenticated) => {
      console.log(reautenticated);
      if (reautenticated) {
        return Promise.resolve(this.firebaseService.auth.currentUser.updateEmail(email).then(() => {
          return true;
        }, (error) => {
          console.log(error);
          throw 'Not Autenticated User';
        }));
      }
      throw 'Not Autenticated User';
    });
  }
}
