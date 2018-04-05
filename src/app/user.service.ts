import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operator/map';
import { User } from './user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private _userUrl = '../assets/user.json';

  constructor(private _http: Http) { }

  getUser(id: number): Observable<User> {
    return this._http.get(this._userUrl).map((response) =>
    <User>response.json());
  }

  getUsers(): Observable<User> {
    return this._http.get(this._userUrl).map((response) =>
    <User>response.json());
  }
}
