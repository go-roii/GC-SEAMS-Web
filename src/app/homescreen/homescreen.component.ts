import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavExpandService } from '../services/sidenav-expand.service';
import { UserService } from '../services/user.service';
import {DepartmentService} from "../services/department.service";
import {RequestParams} from "../models/RequestParams";
import {Departments} from "../models/Departments";
import {Speaker} from "../models/Speaker";
import {DataService} from "../services/data.service";
import {HttpHeaders} from "@angular/common/http";
import {SpeakersService} from "../services/speakers.service";
import { EventsComponent } from './events/events.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {UserProfile} from "../models/UserProfile";

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss']
})

export class HomescreenComponent implements OnInit {

  @ViewChild("sidenav") sidenav?: ElementRef;
  @ViewChild("navbar") navbar?: ElementRef;
  @ViewChild("content") content?: ElementRef;

	isSidenavExpanded: boolean = this.sidedenavExpandService.isSidenavExpanded;
  sidenavWidth: number = this.sidedenavExpandService.sidenavWidth;
  fullName!: string ;
  email!: string;

	// currentPage: string = this.router.url;
	currentPage: string = '';

	constructor(private router : Router,
              private userService: UserService,
              private sidedenavExpandService: SidenavExpandService,
              public breakpointObserver: BreakpointObserver,
              private departmentService: DepartmentService,
              private speakersService: SpeakersService,
              private dataService: DataService
  ) {
    this.sidedenavExpandService.sidenavExpandChange.subscribe((value) => {
      this.isSidenavExpanded = value;
    });

    this.sidedenavExpandService.sidenavWidthChange.subscribe((value) => {
      this.sidenavWidth = value;
    });
  }

	ngOnInit(): void {
    this.breakpointObserver
    .observe(['(max-width: 1199.98px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches)
        this.sidedenavExpandService.sidenavExpandChange.next(this.isSidenavExpanded = false);
      else
        this.sidedenavExpandService.sidenavExpandChange.next(this.isSidenavExpanded = true);
    });

    //department service will be loaded if not yet
    if(!this.departmentService.isLoaded){
      this.fetchDepartments()
      this.departmentService.isLoaded=true;
    }

    //speakers service will be loaded in not yet
    if(!this.speakersService.IsLoaded){
      this.fetchSpeakers();
    }

    //refresh timer will be started if not yet
    if(!this.userService.getTimerIsStarted()){
      this.userService.getRefreshToken();
      this.userService.start();
    }


    const firstName: string = this.userService.getActiveUser().first_name;
    const lastName: string = this.userService.getActiveUser().last_name;
    this.fullName=firstName+" "+lastName;
    this.email=this.userService.getActiveUser().email_address;

		// this.router.navigate(['homescreen/events/ongoing'])
		// this.router.events.subscribe(event => {
		// 	if (event instanceof NavigationStart) {
		// 		this.routerChangeMethod(event.url);
		// 	}
		// })

    console.log("refresh token: "+this.userService.getRefreshToken().refresh_token);
    console.log("access token: "+this.userService.getAuthHeader())
    console.log(this.userService.getLoginState());
    console.log(this.userService.getActiveUser())
    this.fetchProfile();
	}

  ngAfterViewInit() {
    setTimeout(() => { 
      this.sidenav?.nativeElement.classList.add('sidenav-transition')
      this.navbar?.nativeElement.classList.add('navbar-transition') 
      this.content?.nativeElement.classList.add('content-transition') 
    }, 0)
  }

	// routerChangeMethod(url: string) {
	// 	this.currentPage = url;
	// }

  public onRouterOutletActivate(event : any) {
    console.log(event);

    if(event instanceof EventsComponent)
      this.currentPage = 'events'
    else if(event instanceof EventDetailsComponent)
      this.currentPage = 'events'
    else if(event instanceof CreateEventComponent)
      this.currentPage = 'create-event'
    else if(event instanceof DashboardComponent)
      this.currentPage = 'dashboard'
    else if(event instanceof AnalyticsComponent)
      this.currentPage = 'dashboard'
    else
      this.currentPage = ''
  }

	sidenav_status() {
    console.log(this.isSidenavExpanded);

    this.sidedenavExpandService.toggleSidebarExpand()
	}

  logout(){
    this.userService.logOut();
    console.log(this.userService.getLoginState());
  }

  getHttpOptions(){
    const trimmedHeader=this.userService.getAuthHeader().split(':');
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: trimmedHeader[1]
      })
    };
    return httpOptions;
  }


  public fetchDepartments(){
    const departmentParams= new RequestParams();
    departmentParams.EndPoint="departments";
    departmentParams.RequestType=1;

    this.dataService.httprequest(departmentParams)
      .subscribe((data: Departments[]) => this.departmentService.setDepartments(data));
  }

  public fetchSpeakers(){
    const speakerParams= new RequestParams();
    speakerParams.EndPoint="speakers";
    speakerParams.RequestType=5;
    speakerParams.AuthToken=this.getHttpOptions();

    this.dataService.httprequest(speakerParams)
      .subscribe((data: Speaker[]) => this.speakersService.setSpeakers(data));
  }

  fetchProfile(){
    const speakerParams= new RequestParams();
    speakerParams.EndPoint="profile";
    speakerParams.RequestType=5;
    speakerParams.AuthToken=this.getHttpOptions();

    this.dataService.httprequest(speakerParams)
      .subscribe((data: UserProfile) => this.userService.setActiveUser(data));
  }

}
