import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {
    email: '',
    password: ''
  };

  constructor(public snackBar: MatSnackBar,
    private _auth: AuthService,
    private _router: Router) { }


  ngOnInit() {
  }
  loginUser () {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        this.openSnackBar('Login Successful', 'OK');
        localStorage.setItem('token', res.token);
        this._router.navigate(['/dashboard']);
      },
      err => {
        this.openSnackBar('Login Failed', 'Retry');
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
