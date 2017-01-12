import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { MdSnackBar } from '@angular/material/snack-bar';
import { MdDialog, MdDialogRef } from '@angular/material/dialog';
import { AdService } from '../../services/ad.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Ad } from '../../models/ad';
import { AccountFormComponent } from '../../shared/components/account-form/account-form.component';
import { YesCancelDialogComponent } from '../../shared/dialogs/yes-cancel-dialog/yes-cancel-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild(AccountFormComponent)
  private accountFormComponent: AccountFormComponent;

  user: User = new User();
  dialogRef: MdDialogRef<YesCancelDialogComponent>;

  constructor(
    private authService: AuthService,
    private adService: AdService,
    private userService: UserService,
    private snackBar: MdSnackBar,
    private dialog: MdDialog) {
  }

  ngOnInit() {
    this.user = this.authService.user;
  }

  saveSubmit(data: {[key: string]: any}) {
    this.user = data['user'];
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
    this.dialogRef = this.dialog.open(YesCancelDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.message = "Are you sure you want to permanently delete your account?";
    this.dialogRef.componentInstance.askForPassword = true;
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
      if (result['response'] == true) {
        return this.authService.reautenticateUser(this.userService.getUserEmail(), result['password']).then((reautenticated) => {
          if (reautenticated) {
            console.log('deleting');
            return Promise.resolve(this.deleteAccountServices().then(() => {
              return true;
            }, (error) => {
              console.log(error);
              let snackRef = this.snackBar.open('Wrong password');
              setTimeout(() => { snackRef.dismiss(); }, 2000);
              return;
            }));
          }
          let snackRef = this.snackBar.open('Wrong password');
          setTimeout(() => { snackRef.dismiss(); }, 2000);
        });
      }
    });
  }

  deleteAccountServices(): Promise<any> {
    let ads: Ad[] = [];
    // get user adds
    // delete all adds
    return this.adService.getUserAds(this.authService.user)
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
