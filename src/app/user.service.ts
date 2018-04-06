import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operator/map';
import { User } from './user';
// import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  private _usersUrl = 'http://localhost:3000/api/users';

  constructor(private _http: HttpClient) { }

  getUsers() {
    return this._http.get<any>(this._usersUrl);
  }
  // getUsers(): Observable<User> {
  //   return this._http.get(this._userUrl).map((response) =>
  //   <User>response.json());
  // }
}
