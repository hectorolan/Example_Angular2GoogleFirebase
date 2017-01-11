import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { MdSnackBar } from '@angular/material/snack-bar';
import { AdService } from '../../services/ad.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Ad } from '../../models/ad';
import { AccountFormComponent } from '../../shared/components/account-form/account-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild(AccountFormComponent)
  private accountFormComponent: AccountFormComponent;
  showChangePasswordButton: boolean = false;
  user: User = new User();

  constructor(
    private authService: AuthService,
    private adService: AdService,
    private userService: UserService,
    private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.user = this.authService.user;
    this.showChangePasswordButton = this.authService.isPasswordUser();
  }

  saveSubmit(data: {[key: string]: any}) {
    this.user = data['user'];
    // this.user = user;
    this.userService.saveUser(this.user).then(() => {
      this.authService.refreshFireBaseVariables().then(() => {
        let snackRef = this.snackBar.open('Saved!');
        setTimeout(() => { snackRef.dismiss(); }, 2000);
        this.accountFormComponent.buildForm();
      });
    });
  }

  changePasswordEmail() {
    this.authService.sendChangePasswordEmail(this.userService.getUserEmail()).then(() => {
        let snackRef = this.snackBar.open('Change password email send.');
        setTimeout(() => { snackRef.dismiss(); }, 2000);
    });
  }

  deleteAccount() {
    let ads: Ad[] = [];
    // get user adds
    // delete all adds
    this.adService.getUserAds(this.authService.user)
    .then((userAds) => {
      ads = userAds;
      ads.forEach(element => {
        this.adService.deleteAd(element.id, this.authService.user);
      });
    })
    .then(() => {
      // delete user from DB
      // delete user drom auth
      return this.userService.deleteUser(this.authService.user);
    })
    .then(() => {
      this.authService.logout();
    });
  }
}
