import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {UserProfile} from "../models/UserProfile";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private activeUser!: UserProfile;

  constructor(private router: Router) {
  }

  setLoginState(){
    sessionStorage.setItem('loginstate', 'true')
    this.router.navigateByUrl('/homescreen')
  }

  getLoginState(){ return sessionStorage.getItem('loginstate') }

  logOut(){
    sessionStorage.clear()
    this.router.navigateByUrl('')
  }

  public set ActiveUser(val: UserProfile){
    this.activeUser=val;
  }

  public get ActiveUser(){
    return this.activeUser;
  }

  // setUserData(data: any) {
  //   sessionStorage.setItem('userdata', data)
  // }
  //
  // getUserData() { return sessionStorage.getItem('userdata') }

}
