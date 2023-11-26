import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  loggedIn = false;

  setLoggedIn(value : boolean){
    this.loggedIn = value
  }
  isLoggedIn(){
    return this.loggedIn;
  }
}
