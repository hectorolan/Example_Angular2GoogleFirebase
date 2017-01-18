import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Section } from '../../models/section';
import { Console } from '../../models/console';
import { Ad } from '../../models/ad';
import { User } from '../../models/user';
import { AdService } from '../../services/ad.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { IgdbService, Game } from '../../services/igdb.service';

@Component({
  selector: 'app-createad',
  templateUrl: './createad.component.html',
  styleUrls: ['./createad.component.css']
})
export class CreateAdComponent implements OnInit {
  validUserFlag: boolean = true;
  sections = Section.Sections;
  consoles = Console.Consoles;
  prices;
  ad: Ad = new Ad();
  gameSelected: Game;
  adImageFile: File;
  adImageSrc: string = '';

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
    private userService: UserService,
    private adService: AdService,
    private igdbService: IgdbService) { }

  ngOnInit() {
    if (!this.validUser()) {
      this.validUserFlag = false;
      return false;
    }
    this.buildForm();
  }

  validUser(): boolean {
    if (this.authService.user.city === '') {
      return false;
    }
    if (this.authService.user.telephone === '') {
      return false;
    }
    return true;
  }

  buildForm(): void {
    this.ad = new Ad();
    this.gameSelected = null;
    this.formMessageCompletion = '';
    this.formTabSelectedIndex = '0';
    this.adImageSrc = '';
    this.adImageFile = null;
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
    this.adService.saveAd(this.ad, this.authService.user, this.adImageFile).then(() => {
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
    this.ad.name = this.formCreateAd.controls['name'].value; // when field is disable, name does not transfer
    this.ad.owner = user.name;
    this.ad.ownerid = user.id;
    this.ad.email = user.emailOnAd === true ? this.userService.getUserEmail() : '';
    this.ad.city = user.city;
    this.ad.telephone = user.telephoneOnAd === true ? user.telephone : '';
    let expdate = new Date();
    expdate.setDate(expdate.getDate() + 21);
    this.ad.expDateMilliseconds = expdate.getTime();
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
    this.formCreateAd.controls['name'].disable();
    this.formCreateAd.controls['name'].patchValue(game.name, {onlySelf: true});
    this.formCreateAd.controls['name'].updateValueAndValidity(true);
    if (this.gameSelected && this.gameSelected.cover) {
      this.adImageSrc = this.igdbService.getGameURL(this.gameSelected.cover.cloudinary_id);
    }
  }

  onGameUnselected() {
    this.adImageSrc = '';
    this.gameSelected = null;
    this.formCreateAd.controls['name'].enable();
    this.formCreateAd.controls['name'].patchValue('', {onlySelf: true});
    this.formCreateAd.controls['name'].updateValueAndValidity(true);
  }
  // or
  onFileChanged(event: any) {
    this.adImageSrc = '';
    this.adImageFile = null;
    if (event.srcElement.files && event.srcElement.files[0]) {
      this.adImageFile = event.srcElement.files[0];
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.adImageSrc = e.target.result;
        }
        reader.readAsDataURL(event.srcElement.files[0]);
    }
  }

  keys(dictionary): Array<string> {
    return Object.keys(dictionary);
  }
}
