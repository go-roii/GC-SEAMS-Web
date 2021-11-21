import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {UserProfile} from "../models/UserProfile";
import {RefreshTokens} from "../models/RefreshTokens";
import { interval, Subscription } from 'rxjs';
import {DataService} from "./data.service";
import {RequestParams} from "../models/RequestParams";
import {HttpHeaders} from "@angular/common/http";
import {Token} from "@angular/compiler";
import {SpeakersService} from "./speakers.service";
import {DepartmentService} from "./department.service";

@Injectable({
  providedIn: 'root'
})

export class UserService{

  private timerIsStarted: boolean=false;
  private subscription!: Subscription;
  private headers!: string[];
  private authHeader! :string;
  constructor(private router: Router,
              private dataService: DataService,
              private speakersService: SpeakersService,
              private departmentService: DepartmentService
  ) {
  }

  private TimerIsStarted(){
    this.timerIsStarted=true;
  }

  public getTimerIsStarted(){
    return this.timerIsStarted;
  }

  public get HttpOptions(){

    const trimmedHeader=this.getAuthHeader().split(':');

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

  getLoginState(){
    return sessionStorage.getItem('loginstate')
  }

  logOut(){
    this.stopTimer();
    sessionStorage.clear()
    this.router.navigateByUrl('')
    this.speakersService.IsLoaded=false;
    this.departmentService.isLoaded=false;
  }

  public setRefreshToken(token: RefreshTokens){
    sessionStorage.setItem('session-storage', JSON.stringify(token))
  }

  public getRefreshToken(){
    return JSON.parse(<string>sessionStorage.getItem('session-storage'))
  }

  public setAuthHeader(header: string){
    sessionStorage.setItem('auth-header', header)
  }

  public updateAuthHeader(header: string){
    sessionStorage.removeItem('auth-header');
    sessionStorage.setItem('auth-header', header);
  }

  public getAuthHeader(){
    const header: any = sessionStorage.getItem('auth-header');
    return header;
  }


  public setActiveUser(user: UserProfile){
    sessionStorage.setItem('active-user', JSON.stringify(user))
  }

  public getActiveUser(){
    return JSON.parse(<string>sessionStorage.getItem('active-user'))
  }

  start(){
    this.TimerIsStarted();
    const source = interval(240000); //this interval is equivalent to 4 minutes
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

    const refreshToken: RefreshTokens = this.getRefreshToken();

    const refreshParams= new RequestParams();
    refreshParams.EndPoint="/token/refresh";
    refreshParams.Body=refreshToken;
    refreshParams.RequestType=3;

    this.dataService.getNewAccessToken(refreshParams.EndPoint, refreshParams.body)
      // resp is of type `HttpResponse<RefreshTokens>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();

        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `RefreshTokens`.
        this.updateAuthHeader(this.headers[0])
        //this.setAuthHeader(this.headers[0]);
        const trimmedHeader=this.getAuthHeader().split(':');
        console.log("new access-token: "+trimmedHeader[1])

      });
  }

  stopTimer(){
    // stop the timed refresh
    this.subscription && this.subscription.unsubscribe();
  }
}
