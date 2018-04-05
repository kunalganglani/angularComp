import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'contactNumber',
    'alternateContactNumber', 'email', 'gender', 'username'];
  dataSource;
  constructor(private _userService: UserService) {
    this.setDataSource();
  }
  setDataSource(): any {
    this.dataSource = this._userService.getUsers();
  }
  ngOnInit() {
  }

}

