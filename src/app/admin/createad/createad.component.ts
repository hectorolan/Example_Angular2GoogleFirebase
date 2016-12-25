import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Section } from '../../models/section';
import { Console } from '../../models/console';
import { Ad } from '../../models/ad';
import { User } from '../../models/user';
import { AdService } from '../../services/ad.service';
import { AuthService } from '../../services/auth.service';
import { IgdbService, Game } from '../../services/igdb.service';

@Component({
  selector: 'app-createad',
  templateUrl: './createad.component.html',
  styleUrls: ['./createad.component.css']
})
export class CreateAdComponent implements OnInit {
  sections = Section.Sections;
  consoles = Console.Consoles;
  prices;
  ad: Ad = new Ad();
  gameSelected: Game;

  formActive = true;
  formCreateAd: FormGroup;
  formMessageCompletion: string = '';
  formTabSelectedIndex: string = '0';
  formErrors = {
    'name': '',
    'price': '',
    'console': '',
    'section': ''
  };
  formValidationMessages = {
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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private adService: AdService,
    private igdbService: IgdbService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.ad = new Ad();
    this.gameSelected = null;
    this.formMessageCompletion = '';
    this.formTabSelectedIndex = '0';
    this.prices = null;
    this.formCreateAd = this.formBuilder.group({
      'name': [this.ad.name, [
          Validators.required,
          Validators.minLength(3)
      ]],
      'price': [this.ad.price, [
          Validators.required
      ]],
      'console': [ {
          value: this.ad.console
        }, [
          Validators.required
      ]],
      'section': [ {
          value: this.ad.section
        }, [
          Validators.required
      ]],
      'description': [this.ad.description]
    });
    this.formCreateAd.valueChanges.subscribe(data => this.onValueChanged(data),
    () => {});
    this.onValueChanged();
  }

  onSubmit() {
    this.adService.saveAd(this.ad, this.authService.user).then(() => {
      this.router.navigate(['admin/myads']);
    });
  }

  resetChanges() {
    this.buildForm();
    this.formActive = false;
    this.formActive = true;
  }

  onValueChanged(data?: any) {
    if (!this.formCreateAd) {
      return;
    }
    const form = this.formCreateAd;

    for (const field in this.formCreateAd.controls) {
      if (this.formCreateAd.contains(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.formValidationMessages[field];
          for (const key in control.errors) {
            if (messages[key] !== '') {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  completeTab(control: string, value: string) {
    if (value === '') {
      return;
    }
    switch (control) {
      case 'console':
        this.formCreateAd.controls[control].patchValue(value, {onlySelf: true});
        this.formCreateAd.controls[control].updateValueAndValidity(true);
        this.formMessageCompletion = this.consoles[value];
        this.formTabSelectedIndex = '1';
        break;
      case 'section':
        this.formCreateAd.controls[control].patchValue(value, {onlySelf: true});
        this.formCreateAd.controls[control].updateValueAndValidity(true);
        this.formMessageCompletion += '\\' + this.sections[value];
        this.prices = Ad.prices[value];
        this.formTabSelectedIndex = '2';
        break;
      case 'name':
        this.formMessageCompletion += '\\' + value;
        this.formTabSelectedIndex = '3';
        break;
      case 'pricedescription':
        this.formMessageCompletion = '';
        this.formTabSelectedIndex = '4';
        Promise.resolve(this.setObjectToSave());
        break;
    }
  }

  setObjectToSave() {
    let user: User = this.authService.user;
    this.ad = this.formCreateAd.value;
    this.ad.owner = user.name;
    this.ad.ownerid = user.id;
    this.ad.email = user.emailOnAd === true ? user.email : '';
    this.ad.city = user.city;
    this.ad.telephone = user.telephoneOnAd === true ? user.telephone : '';
    this.ad.expDate = new Date();
    this.ad.expDate.setDate(this.ad.expDate.getDate() + 21);
    let contactMethod = '';
    contactMethod += user.methodCall ? 'Call;' : '';
    contactMethod += user.methodTextMessage ? 'Text;' : '';
    contactMethod += user.methodEmail ? 'Email' : '';
    this.ad.contactMethod = contactMethod;
    if (this.gameSelected && this.gameSelected.cover) {
      this.ad.imageKey = this.gameSelected.cover.cloudinary_id;
    }
  }

  onGameSelected(game: Game) {
    this.gameSelected = game;
    this.formCreateAd.controls['name'].patchValue(game.name, {onlySelf: true});
    this.formCreateAd.controls['name'].updateValueAndValidity(true);
  }

  onGameUnselected() {
    this.gameSelected = null;
    this.formCreateAd.controls['name'].patchValue('', {onlySelf: true});
    this.formCreateAd.controls['name'].updateValueAndValidity(true);
  }

  keys(dictionary): Array<string> {
    return Object.keys(dictionary);
  }
}
