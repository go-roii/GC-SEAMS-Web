import {Injectable, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import {UserProfile} from "../models/UserProfile";
import {RefreshTokens} from "../models/RefreshTokens";
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService implements OnDestroy{

  subscription!: Subscription;
  intervalId!: number;

  private activeUser!: UserProfile;
  private refreshToken!: RefreshTokens;
  private authHeader! :string;

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

  public set AuthHeader(header: string){
    this.authHeader=header
  }

  public get AuthHeader(){
    return this.authHeader;
  }

  public set RefreshToken(token: RefreshTokens){
    this.refreshToken=token;
  }

  public get RefreshToken(){
    return this.refreshToken;
  }

  public set ActiveUser(val: UserProfile){
    this.activeUser=val;
  }

  public get ActiveUser(){
    return this.activeUser;
  }

  start(){

    // This is METHOD 1
    const source = interval(270000);
    const text = 'The access-token is expired';
    this.subscription = source.subscribe(val => this.opensnack(text));
  }

  opensnack(text: string) {
    // I've just commented this so that you're not bombarded with an alert.
    alert(text);
    console.log(text);
    this.logOut();
    this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    // For method 1
    this.subscription && this.subscription.unsubscribe();
  }




  // setUserData(data: any) {
  //   sessionStorage.setItem('userdata', data)
  // }
  //
  // getUserData() { return sessionStorage.getItem('userdata') }
}
