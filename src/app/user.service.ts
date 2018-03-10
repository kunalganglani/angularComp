import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { map } from 'rxjs/operator/map';

@Injectable()
export class UserService {

  private _userUrl = '../assets/user.json';

  constructor(private _http: Http) { }

  getUser(id: number){
    return this._http.get(this._userUrl).map((response) => 
    response.json());
  }
}
