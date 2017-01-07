import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { FirebaseService } from './firebase.service';

@Injectable()
export class UserService {

  constructor(private firebaseService: FirebaseService) { }

  getUserUid(): string  {
    if (this.firebaseService.auth.currentUser) {
      return this.firebaseService.auth.currentUser.uid
    }
    return '';
  }

  getUser(userId: string): Promise<User> {
    return Promise.resolve(
      this.firebaseService.database.ref('/users/' + userId).once('value').then(
        function(snapshot) {
          let user: User = snapshot.val();
          return user;
        }
      )
    );
  }

  saveUser(user: User) {
    return Promise.resolve(this.firebaseService.database.ref('users/' + user.id).set(user));
  }

  createUser(email: string, password: string): Promise<any> {
    return Promise.resolve(this.firebaseService.auth.createUserWithEmailAndPassword(email, password).catch((error: any) => {
        console.log('Error creating new user:');
        console.log(error.code);
        console.log(error.message);
      }));
  }

  updateUser() {

  }
  //TODO diferentiate the saveuser to database vs create new user on auth

  sendEmailVerification(): Promise<any> {
    if (this.firebaseService.auth.currentUser) {
      return Promise.resolve(this.firebaseService.auth.currentUser.sendEmailVerification().then(() => {
              // Email sent.
            }, (error) => {
              // An error happened.
            }
      ));
    }
    return null;
  }
}
