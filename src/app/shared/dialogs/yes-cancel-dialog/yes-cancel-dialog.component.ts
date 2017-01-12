import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-cancel-dialog',
  templateUrl: './yes-cancel-dialog.component.html',
  styleUrls: ['./yes-cancel-dialog.component.css']
})
export class YesCancelDialogComponent implements OnInit {

  message: string = 'this is the message';
  askForPassword: boolean = false;
  dialogForm: FormGroup;
  formFields = {
    'password': ''
  };
  formErrors = {
    'password': ''
  };
  validationMessages = {
    'password': {
      'required':   'Password is required',
      'minlength':  'Too short'
    }
  };

  constructor(
    public dialogRef: MdDialogRef<YesCancelDialogComponent>,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.dialogForm = this.formBuilder.group({
      'password': [this.formFields.password, [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
    this.dialogForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.dialogForm) {
      return;
    }
    const form = this.dialogForm;

    for (const field in this.dialogForm.controls) {
      if (this.dialogForm.contains(field)) {
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

  closeSubmit(response: boolean) {
    this.formFields.password = this.dialogForm.controls['password'].value;
    this.dialogRef.close({
      'response': response,
      'password': this.formFields.password});
  }

}
