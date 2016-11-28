import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Section } from '../../models/section';
import { Console } from '../../models/console';
import { Ad } from '../../models/ad';
import { User } from '../../models/user';

@Component({
  selector: 'app-createad',
  templateUrl: './createad.component.html',
  styleUrls: ['./createad.component.css']
})
export class CreateAdComponent implements OnInit {
  sections = Section.Sections;
  consoles = Console.Consoles;

  createAdForm: FormGroup;
  ad: Ad = new Ad();
  user: User = new User();
  active = true;

  formErrors = {
    'name': '',
    'price': '',
    'console': '',
    'section': ''
  };

  validationMessages = {
    'name': {
      'required':   'Name is required.',
      'minlength':  'Name must be at least 3 characters long.'
    },
    'price': {
      'required':     'Price is required.',
      'invalidEmail': 'Verify price.'
    },
    'console': {
      'required': 'Console is required.'
    },
    'section': {
      'required': 'Section is required.'
    }
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void{
    this.createAdForm = this.formBuilder.group({
      'name': [this.ad.name, [
          Validators.required,
          Validators.minLength(3)
      ]],
      'price': [this.ad.price, [
          Validators.required
      ]],
      'console': [this.ad.console, [
          Validators.required
      ]],
      'section': [this.ad.section, [
          Validators.required
      ]],
      'description': [this.ad.description]
    });

    this.createAdForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit() {
    this.ad = this.createAdForm.value;
  }

  cancelChanges() {
    this.ad = new Ad();
    this.buildForm();
  }

  onValueChanged(data?: any) {
    if (!this.createAdForm) {
      return;
    }
    const form = this.createAdForm;

    for (const field in this.createAdForm.controls) {
      if (this.createAdForm.contains(field)) {
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

  keys(dictionary): Array<string> {
    return Object.keys(dictionary);
  }
}
