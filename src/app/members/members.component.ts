import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { EventService } from '../event.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth/services/auth.service';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'contactNumber',
    'email', 'gender', 'username', 'edit', 'delete'];
  // displayedColumns = ['id', 'name', 'description', 'date'];
  dataSource;
  constructor(
    public snackBar: MatSnackBar,
    private _spinnerService: SpinnerService,
    private _userService: UserService,
    private _auth: AuthService,
    private _router: Router
  ) {
    this.setDataSource();
  }
  setDataSource(): any {
    this._userService.getUsers()
      .subscribe(
        res => {
          this.dataSource = res;
          },
        err => {
          this.openSnackBar(`Error: ${err.error.text}`, 'Register a few users');
        }
      );
    // this.dataSource = [
    //   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    //   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    // ];
  }
  ngOnInit() {
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  deleteRowUser(element) {
    this._spinnerService.show('mySpinner');
    this._auth.deleteUser(element._id)
      .subscribe(
        res => {
          this.openSnackBar(`User with username: ${element.username}- Deleted Successful`, 'OK');
          this._spinnerService.hide('mySpinner');
        },
        err => {
          this._spinnerService.hide('mySpinner');
          this.openSnackBar(`Delete Failed- ${err.error}`, 'Retry');
        },

        () => {
          this.setDataSource();
        }
      );
  }

}

