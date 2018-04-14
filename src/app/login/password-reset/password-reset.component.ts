import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;


  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private _auth: AuthService,
    private _router: Router) {
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
      });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.resetUser();
    }
    this.formSubmitAttempt = true;
  }

  resetUser() {
    this.openSnackBar(`Can't find that email, sorry.`, `Try a different email`);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
