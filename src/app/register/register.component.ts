import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form;
  registerUserData = {
    firstName: '',
    lastName: '',
    contactNumber: '',
    gender: '',
    alternateContactNumber: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  constructor(public snackBar: MatSnackBar, private formBuilder: FormBuilder,
    private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      // medium: this.formBuilder.control('Movies'),
      // passing default values
      // alphanumeric string, with support for dash, space and /
      firstName: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      lastName: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      contactNumber: this.formBuilder.control('', Validators.compose([
        Validators.pattern('^[0-9 ()+-]+$'),
        Validators.required
      ])
    ),
      alternateContactNumber: this.formBuilder.control('', Validators.compose([
        Validators.pattern('^[0-9 ()+-]+$'),
        Validators.required
      ])),
      email: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.email
      ])
      ),
      gender: this.formBuilder.control(''),
      username: this.formBuilder.control('', Validators.compose([
        Validators.required,
        // Validators.pattern('[\\w\\-\\s\\/]+'),
      ])
      ),
      password: this.formBuilder.control('', Validators.compose([
        Validators.required,
        // Validators.pattern('[\\w\\-\\s\\/]+')
        this.isPasswordMatching.bind(this)
      ])),
      confirmPassword: this.formBuilder.control('', Validators.required),
      // category: this.formBuilder.control(''),
      // year: this.formBuilder.control('', this.yearValidator),
      // you dont need to call your custom validators, form control will call it.
    });
  }

  registerUser(userItem) {
    this._auth.registerUser(userItem)
      .subscribe(
        res => {
          this.openSnackBar('Registration Successful', 'OK');
          localStorage.setItem('token', res.token);
          this._router.navigate(['/members']);
        },
        err => {
          this.openSnackBar(`ERROR ${err}`, 'Retry');
          console.log(err);
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  isPasswordMatching(control) {
    return null;
    /* if (this.registerUserData.password !== this.registerUserData.confirmPassword) {
      return null;
    }
    return {
      'password': true
    }; */
  }
  yearValidator(control) {
    if (control.value.trim().length === 0) {
      return null;
    }
    const year = parseInt(control.value, 10);
    const min = 1900;
    const max = 2100;
    if (year >= min && year <= max) {
      return null;
    } else {
      // return { 'year': true }; // returning that year object is valid..
      // your can return an object in any format.
      return {
        'year': {
          min,
          max
        }
      };
    }
  }


  onSubmit(userItem) {
    this.registerUser(userItem);
    // this.mediaItemService.add(mediaItem);
  }

}
