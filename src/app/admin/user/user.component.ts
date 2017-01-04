import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { MdSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { AccountFormComponent } from '../../shared/components/account-form/account-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild(AccountFormComponent)
  private accountFormComponent: AccountFormComponent;

  user: User = new User();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.user = this.authService.user;
  }

  saveSubmit(data: {[key: string]: any}) {
    this.user = data['user'];
    //this.user = user;
    this.userService.saveUser(this.user).then(() => {
      this.authService.refreshFireBaseVariables().then(() => {
        let snackRef = this.snackBar.open('Saved!');
        setTimeout(() => { snackRef.dismiss(); }, 2000);
        this.accountFormComponent.buildForm();
      });
    });
  }
}
