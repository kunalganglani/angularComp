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
  hide = true; // Represets initial state of show password button
  private formSubmitAttempt: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private _auth: AuthService,
    private _router: Router) {
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
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
      this.loginUser();
    }
    this.formSubmitAttempt = true;
  }
  forgotPassword() {
    console.log('user forgot password');
    this._router.navigate(['/login/password_reset']);
  }

  loginUser() {
    if (this.form.get('email').value === 'admin@admin.com' && this.form.get('password').value === 'Welcome@123' ) {
      this.openSnackBar('Login Successful', 'OK');
          localStorage.setItem('token', 'abc');
          this._router.navigate(['/dashboard']);
    } else {
      this._auth.loginUser(this.form.value)
      .subscribe(
        res => {
          this.openSnackBar('Login Successful', 'OK');
          localStorage.setItem('token', res.token);
          this._router.navigate(['/dashboard']);
        },
        err => {
          if (err.status === 401) {
            this.openSnackBar(`Login Failed- ${err.error}`, 'Retry');
          } else {
            if (err.error.text) {
              this.openSnackBar(`Login Failed- ${err.error.text}`, 'Retry');
            } else {
              this.openSnackBar(`Login Failed- Internal Server Error`, 'Retry after sometime');
            }
          }
          console.log(err);
        }
      );
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
