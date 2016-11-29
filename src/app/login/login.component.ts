import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState  } from 'angularfire2';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fireaseme = '';
  message: string;
  loginForm: FormGroup;
  logindata = {
    'email': '',
    'password': ''
  };
  active = true;

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required': 'Email is required.'
    },
    'password': {
      'required':   'Password is required.',
      'minlength':  'Password must be at least 6 characters long.'
    }
  };

  constructor(private authService: AuthService, private router: Router,
    private formBuilder: FormBuilder, private firebase: AngularFire) { }

  ngOnInit() {
    this.setMessage();
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      'email': [this.logindata.email, [
        Validators.required
      ]],
      'password': [this.logindata.password, [
        Validators.required,
        Validators.minLength(6)
      ]]
    });

    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';
    this.firebase.auth.login().then(resolve => this.fireaseme = resolve.google.email);
    /*this.authService.login().subscribe(() => {
        this.setMessage();
        if (this.authService.isLoggedIn) {
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
          // let navigationExtras: NavigationExtras = {
          //  preserveQueryParams: true,
          //  preserveFragment: true
          // }
          // this.router.navigate([redirect], navigationExtras);
          this.router.navigate([redirect]);
        }
    });*/
  }

  // logout() {
  //  this.authService.logout();
  //  this.setMessage();
  // }

  cancelLogin() {
    this.firebase.auth.logout();
    //this.router.navigate(['/games']);
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;

    for (const field in this.loginForm.controls) {
      if (this.loginForm.contains(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (messages[key] !== '') {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
