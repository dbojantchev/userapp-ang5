import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from './user/user';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get('/api/getUsers');
  }

  saveUser(user)  {
    return this.http.put('/api/saveUser', user);
  }

  updateUser(user)  {
    return this.http.post('/api/updateUser', user);
  }

  deleteUser(user)  {
    return this.http.post('/api/deleteUser', user);
  }
}
