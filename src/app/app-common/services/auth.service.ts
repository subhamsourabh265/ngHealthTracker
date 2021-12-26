import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth-data.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User = {} as User;
  constructor() { }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random()*10000).toString()
    }
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random()*10000).toString()
    }
  }

  logOut() {
    this.user = null as any;
  }

  getUser() {
    return { ...this.user }
  }

  isAuth() {
    return this.user != null;
  }

}
