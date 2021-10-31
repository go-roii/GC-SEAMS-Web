import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router) { }

  setLoginState(){
    sessionStorage.setItem('loginstate', 'true')
    this.router.navigateByUrl('home')
  }

  getLoginState(){ return sessionStorage.getItem('loginstate') }

  logOut(){
    sessionStorage.clear()
    this.router.navigateByUrl('')
  }

  setUserData(data: any) {
    sessionStorage.setItem('userdata', data)
  }
  getUserData() { return sessionStorage.getItem('userdata') }

}
