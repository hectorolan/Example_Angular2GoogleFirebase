import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material/snack-bar';
import { MdDialog, MdDialogRef } from '@angular/material/dialog';
import { GetEmailDialogComponent} from '../get-email-dialog/get-email-dialog.component';
import { AuthService} from '../../services/auth.service';
import { UserService} from '../../services/user.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  email: string;
  dialogRef: MdDialogRef<GetEmailDialogComponent>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MdSnackBar,
    private dialog: MdDialog,
    private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn === false) {
      this.router.navigate(['/games']);
    }
    this.email = this.userService.getUserEmail();
  }

  resendVerificationEmail(): Promise<any> {
    return this.userService.sendEmailVerification().then(() => {
      let snackRef = this.snackBar.open('Verification Send!');
      setTimeout(() => { snackRef.dismiss(); }, 2000);
      this.router.navigate(['/games']);
    });
  }

  changeEmail() {
    this.dialogRef = this.dialog.open(GetEmailDialogComponent, {
      disableClose: false
    });
    // Ask for new email
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
      if (this.userService.getUserEmail() === result['email']) {
        let snackRef = this.snackBar.open('Email entered is the same.');
        setTimeout(() => { snackRef.dismiss(); }, 2000);
        return true;
      }
      let newEmail = result['email'];
      let password = result['password'];
      // Update email on Authorization
      this.authService.updateAuthorizationEmail(newEmail, this.userService.getUserEmail(), password)
      .then(() => {
        // Resend Verification
        this.resendVerificationEmail().then(() => {
          let snackRef = this.snackBar.open('Changed, Verification Email Send!');
          setTimeout(() => { snackRef.dismiss(); }, 2000);
          this.dialogRef = null;
          this.router.navigate(['/games']);
        });
      });
    });
  }

}
