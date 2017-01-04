import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { MdSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { AccountFormComponent } from '../../shared/components/account-form/account-form.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @ViewChild(AccountFormComponent)
  private accountFormComponent: AccountFormComponent;
  user: User = new User();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MdSnackBar,
    private router: Router) {
  }

  ngOnInit() {
  }

  saveSubmit(data: {[key: string]: any}) {
    this.user = data['user'];
    this.userService.createUser(this.user.email, data['password']).then(() => {
      if (this.userService.getUserUid() !== '') {
        this.user.id = this.userService.getUserUid()
        this.userService.saveUser(this.user).then(() => {
        this.authService.refreshFireBaseVariables().then(() => {
          let snackRef = this.snackBar.open('Saved!');
          setTimeout(() => { snackRef.dismiss(); }, 2000);
          this.router.navigate(['/admin/myads']);
        });
      });
      }
    });
  }
}
