import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpHeaders} from "@angular/common/http";
import {RequestParams} from "../../models/RequestParams";
import {EventsToAdd} from "../../models/EventsToAdd";
import {UserService} from "../../services/user.service";
import {DataService} from "../../services/data.service";
import {ViewsAnalyticsCount} from "../../models/ViewsAnalyticsCount";
import {EventSummary} from "../../models/EventSummary";
import {RegistrationAnalyticsCount} from "../../models/RegistrationAnalyticsCount";
import {OverallAnalytics} from "../../models/OverallAnalytics";
import {AnalyticsByDepartment} from "../../models/AnalyticsByDepartment";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    '../homescreen.component.scss',
    './dashboard.component.scss'
  ]
})
export class DashboardComponent implements OnInit {
  public eventsSummary!: EventSummary[];
  public eventsAnalytics!: ViewsAnalyticsCount[];
  public overallAnalytics: OverallAnalytics[] = [];
  departmentAnalytics!: AnalyticsByDepartment[];
  multi: any[] = [];
  count: number = 1;

  constructor(private router : Router,
              private userService: UserService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchEndedEvents();

    console.log('mock data: --------------------------------------')
    this.mockProcessData();
    console.log('mock data: --------------------------------------')
  }

  async processEventAnalytics(){
    // console.log('Processed event')
    //
    // let arr: ViewsAnalyticsCount[]=[]
    //
    // for(let event of this.eventsSummary){
    //
    //   arr = event.view_count;
    //   console.log(event.view_count);
    //
    // }

  }

  open_analytics_page(uuid: string) {
    console.log('test')
    this.router.navigate(['homescreen/dashboard/analytics', uuid],
    // { skipLocationChange: true }
    )
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

  fetchEndedEvents(){
    const endedEventsParams=new RequestParams();
    endedEventsParams.EndPoint='events/upcoming'
    endedEventsParams.requestType=5;
    endedEventsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(endedEventsParams)
      .subscribe(async (data: EventSummary[]) =>{
        await this.setEventSummary(data)
        await this.processDepartmentAnalyticsData(data);
      });

    console.log("fetch events")
  }

  //link analytics data to event summary
  async linkAnalyticsData(){

    for(let event of this.eventsSummary){
      event.event_id=this.count++;
      const analyticsParams=new RequestParams();
      analyticsParams.EndPoint='analytics/'+event.event_uuid;
      analyticsParams.requestType=5;
      analyticsParams.authToken=this.getHttpOptions();

      this.dataService.httprequest(analyticsParams)
        .subscribe(async (data: OverallAnalytics) =>{
          event.overallAnalytics=data;
          //console.log(data)
        });
    }
  }

  mockProcessData(){
  }

  //add all the views in the analytics per event
  getViewsCount(data:OverallAnalytics){
    return data.views
  }

  processViews(data :ViewsAnalyticsCount[]){
    let sum:number = 0;
    for(let view of data){
      sum += view.views;
      console.log(view.views)
    }

  }

  //add all the views in the analytics per event
  sumRegistrantsAnalytics(data :RegistrationAnalyticsCount[]){
    let sum:number = 0;
    for(let registrants of data){
      sum += registrants.registrations;
    }
    return sum;
  }

  setEventSummary(data: EventSummary[]){
    this.eventsSummary=data;
    //this.linkAnalyticsData();

    console.log("Angular 10 Promises");
    this.linkAnalyticsData()
      .then((data) => {
        try{
          //this.processEventAnalytics();
        }catch (e) {
          console.log(e);
        }

      })
      .catch((error) => {
        console.log("Promise rejected with " + JSON.stringify(error));
      });

    console.log('events summary from setEventSummary()');
    console.log(this.eventsSummary)
    console.log('events summary:---------------------------------------------------------');
  }

  getEventDate(data: EventsToAdd){
    const zonedStartDateTimeArr=data.event_start_date.split('[');
    const zonedStartDateTimeString=zonedStartDateTimeArr[0].toString();

    // const zonedEndDateTimeArr=invitation.event_start_date.split('[');
    // const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    return new Date(zonedStartDateTimeString);
  }

  getEventStartTime(data: EventsToAdd){
    const zonedStartDateTimeArr=data.event_start_date.split('[');
    const zonedStartDateTimeString=zonedStartDateTimeArr[0].toString();

    // const zonedEndDateTimeArr=invitation.event_start_date.split('[');
    // const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    return new Date(zonedStartDateTimeString);
  }

  getEventEndTime(data: EventsToAdd){

    const zonedEndDateTimeArr=data.event_end_date.split('[');
    const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    return new Date(zonedEndDateTimeString);
  }

  processDepartmentAnalyticsData(data: EventSummary[]){
    for(let dept of data){
      this.getEventAnalyticsByDepartment(dept.event_uuid);
    }
  }

  getEventAnalyticsByDepartment(uuid: string){
    const eventDetailsParams=new RequestParams();
    eventDetailsParams.EndPoint='analytics/department/'+uuid;
    eventDetailsParams.requestType=5;
    eventDetailsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(eventDetailsParams)
      .subscribe(async (data: AnalyticsByDepartment[]) =>{
        await this.setDepartmentAnalytics(data);
        await this.setAnalyticsByDepartmentData(data);
        await console.log(data);
      });
  }

  setDepartmentAnalytics(data: AnalyticsByDepartment[]){
    this.departmentAnalytics = data;
  }

  setAnalyticsByDepartmentData(data: AnalyticsByDepartment[]){

    for(let department of data){
      const deptData = {
        "name": department.department_code,
        "series": [
          {
            "name": "Invited",
            "value": department.invited
          },
          {
            "name": "Viewed",
            "value": department.views
          },
          {
            "name": "Registered",
            "value": department.registered
          },
          {
            "name": "Attended",
            "value": department.attendees
          }
        ]
      }

      this.multi.push(deptData)
    }

    this.multi = [...this.multi]

    console.log('multi value:')
    console.log(this.multi)
  }

}
