import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../models/user';
import { MdSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  @Input()
  user: User;

  @Output() saveSubmit = new EventEmitter<{[key: string]: any}>();
  email: string = '';
  accountForm: FormGroup;
  showPassword = false;
  password: string;
  savedUser: User;
  active = true;

  formCustomError = null;
  formErrors = {
    'name': '',
    'email': '',
    'password': '',
    'telephone': '',
    'city': ''
  };

  validationMessages = {
    'name': {
      'required':   'Name is required.',
      'minlength':  'Name must be at least 3 characters long.'
    },
    'email': {
      'required':     'Email is required.',
      'invalidEmail': 'Verify email address.'
    },
    'password': {
      'required':   'Password is required.',
      'minlength':  'Password must be at least 6 characters long.'
    },
    'telephone': {
      'required':   'Telephone is required.',
      'minlength':  'Verify telephone.',
      'maxlength':  'Verify telephone.'
    },
    'city': {
      'required': 'City is required.'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.savedUser = this.user;
    this.email = this.userService.getUserEmail();
    this.buildForm();
  }

  buildForm(): void {
    this.accountForm = this.formBuilder.group({
      'name': [this.user.name, [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      'email': [this.email, [
          Validators.required
        ]
      ],
      'emailOnAd':  [this.user.emailOnAd],
      'password': [this.password, [
          Validators.required,
          Validators.minLength(6)
        ]
      ],
      'telephone': [this.user.telephone, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15)
        ]
      ],
      'telephoneOnAd': [this.user.telephoneOnAd],
      'city': [this.user.city, [
          Validators.required
        ]
      ],
      'methodCall': [this.user.methodCall],
      'methodTextMessage': [this.user.methodTextMessage],
      'methodEmail': [this.user.methodEmail]
    });

    this.accountForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
    if (this.userService.getUserEmail() !== '') {
      this.accountForm.controls['email'].disable();
      this.accountForm.controls['password'].disable();
    } else {
      this.showPassword = true;
    }
  }

  onSubmit() {
    if (this.accountForm.controls['emailOnAd'].value === false && this.accountForm.controls['telephoneOnAd'].value === false) {
      this.formCustomError = `Please have an available contact 
        method: \'Show email on Ad\' or \'Show phone on Ad\' are required to continue.`;
      return false;
    }
    this.formCustomError = null;
    this.user = this.accountForm.value;
    delete this.user['password'];
    delete this.user['email'];
    this.email = this.accountForm.controls['email'].value;
    this.password = this.accountForm.controls['password'].value; // Is not well binded
    this.user.id = this.authService.user.id;
    this.user.accessToken = this.authService.user.accessToken;
    this.user.avatarURL = this.authService.user.avatarURL;
    let response = {'user': this.user, 'email': this.accountForm.controls['email'].value, 'password': this.password};
    this.saveSubmit.emit(response);
  }

  cancelChanges() {
    this.user = this.savedUser;
    this.buildForm();
    return false;
    // this.active = false;
    // setTimeout(() => this.active = true, 0);
  }

  onValueChanged(data?: any) {
    if (!this.accountForm) {
      return;
    }
    const form = this.accountForm;

    for (const field in this.accountForm.controls) {
      if (this.accountForm.contains(field)) {
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
