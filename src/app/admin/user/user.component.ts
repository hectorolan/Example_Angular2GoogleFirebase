import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = new User();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.user = this.authService.user;
  }

  saveSubmit(user: User) {
    this.user = user;
    this.userService.saveUser(this.user).then(() => {
      this.authService.refreshFireBaseVariables().then(() => {
        let snackRef = this.snackBar.open('Saved!');
        setTimeout(() => { snackRef.dismiss(); }, 2000);
        // TODO RebuildForm
      });
    });
  }

}
