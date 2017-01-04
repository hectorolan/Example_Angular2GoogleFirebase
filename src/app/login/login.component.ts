import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TogglenavService } from '../services/togglenav.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  active = true;
  loading = true;
  logindata = {
    'email': '',
    'password': ''
  };
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private togglenavService: TogglenavService) { }

  ngOnInit() {
    this.togglenavService.showNavToggleBtn = false;
    this.buildForm();
    this.authService.checkIfLoggedIn().then(() => {
      if (this.authService.isLoggedIn) {
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin/myads';
          // let navigationExtras: NavigationExtras = {
          //  preserveQueryParams: true,
          //  preserveFragment: true
          // }
          // this.router.navigate([redirect], navigationExtras);
          this.router.navigate([redirect]);
      }
      this.loading = false;
    });
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

  login() {
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }

  cancelLogin() {
    this.router.navigate(['/games']);
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
