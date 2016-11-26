import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  accountForm: FormGroup;
  user: User = new User();
  savedUser = new User();
  active = true;
  counter = '';

  formErrors = {
    'name': '',
    'email': '',
    'telephone': '',
    'city': ''
  };

  validationMessages = {
    'name': {
      'required':   'Name is required.',
      'minlength':  'Name must be at least 4 characters long.'
    },
    'email': {
      'required':     'Email is required.',
      'invalidEmail': 'Verify email address.'
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

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
    this.savedUser.name = 'Hector';
  }

  buildForm(): void {
    this.accountForm = this.formBuilder.group({
      'name': [this.user.name, [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      'email': [this.user.email, [
          Validators.required
        ]
      ],
      'emailOnAd':  [this.user.emailOnAd],
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
  }

  onSubmit() {
    this.user = this.accountForm.value;
    this.counter = this.user.name  + ' ' + this.user.email + ' ' + this.user.methodCall;
  }

  cancelChanges() {
    this.user = this.savedUser;
    this.buildForm();
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
