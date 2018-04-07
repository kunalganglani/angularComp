import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.loginUser();
    }
    this.formSubmitAttempt = true;
  }

  loginUser() {
    this._auth.loginUser(this.form.value)
      .subscribe(
        res => {
          this.openSnackBar('Login Successful', 'OK');
          localStorage.setItem('token', res.token);
          this._router.navigate(['/dashboard']);
        },
        err => {
          this.openSnackBar(`Login Failed- ${err.error.text}`, 'Retry');
          console.log(err);
        }
      );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
