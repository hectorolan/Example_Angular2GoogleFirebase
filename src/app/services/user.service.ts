import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { FirebaseService } from './firebase.service';

@Injectable()
export class UserService {

  constructor(private firebaseService: FirebaseService) { }

  getUser(Userid: string): Promise<User> {
    return Promise.resolve(
      this.firebaseService.database.ref('/users/' + Userid).once('value').then(
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

  updateUser() {

  }
}
