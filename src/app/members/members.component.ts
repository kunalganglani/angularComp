import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { EventService } from '../event.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'contactNumber',
     'email', 'gender', 'username'];
  // displayedColumns = ['id', 'name', 'description', 'date'];
  dataSource;
  constructor(private _userService: UserService) {
    this.setDataSource();
  }
  setDataSource(): any {
    this._userService.getUsers()
      .subscribe(
        res => {
          this.dataSource = res;
          // console.log(this.dataSource);
        },
        err => console.log(err)
      );
    // this.dataSource = [
    //   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    //   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    // ];
  }
  ngOnInit() {
  }

}

