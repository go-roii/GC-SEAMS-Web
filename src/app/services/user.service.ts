import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {UserProfile} from "../models/UserProfile";
import {RefreshTokens} from "../models/RefreshTokens";
import { interval, Subscription } from 'rxjs';
import {DataService} from "./data.service";
import {RequestParams} from "../models/RequestParams";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UserService{

  private subscription!: Subscription;
  private headers!: string[];
  private activeUser!: UserProfile;
  private refreshToken!: RefreshTokens;
  private authHeader! :string;
  private httpOptions!: HttpHeaders
  constructor(private router: Router, private dataService: DataService) {
  }

  public get HttpOptions(){

    const trimmedHeader=this.AuthHeader.split(':');

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: trimmedHeader[1]
      })
    };

    return httpOptions;

  }

  setLoginState(){
    sessionStorage.setItem('loginstate', 'true');
    this.router.navigateByUrl('/homescreen');
  }

  getLoginState(){ return sessionStorage.getItem('loginstate') }

  logOut(){
    this.stopTimer();
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

    const source = interval(240000); //this interval is equivalent to 4 minutes
    const text = 'The access-token is expired';
    this.subscription = source.subscribe(val => this.refreshAccessToken());
  }

  openSnack(text: string) {
    // I've just commented this so that you're not bombarded with an alert.
    alert(text);
    console.log(text);
    this.logOut();
    this.stopTimer();
  }

  refreshAccessToken(){

    const refreshToken: RefreshTokens = this.RefreshToken;

    const loginParams= new RequestParams();
    loginParams.EndPoint="/token/refresh";
    loginParams.Body=refreshToken;
    loginParams.RequestType=3;


    this.dataService.getNewAccessToken(loginParams.EndPoint, loginParams.body)
      // resp is of type `HttpResponse<RefreshTokens>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();

        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `RefreshTokens`.
        this.AuthHeader = this.headers[0];
        const trimmedHeader=this.authHeader.split(':')
        console.log("new access-token: "+trimmedHeader[1])

        //this.start();
        //this.setLoginState();
        //console.log(this.headers);
        //console.log(this.config);
      });
  }

  stopTimer(){
    // For method 1
    this.subscription && this.subscription.unsubscribe();
  }


  // setUserData(data: any) {
  //   sessionStorage.setItem('userdata', data)
  // }
  //
  // getUserData() { return sessionStorage.getItem('userdata') }
}
