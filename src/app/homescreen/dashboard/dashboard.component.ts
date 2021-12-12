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
    console.log('Processed event')

    let arr: ViewsAnalyticsCount[]=[]

    for(let event of this.eventsSummary){

      arr = event.view_count;
      console.log(event.view_count);

    }

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
    endedEventsParams.EndPoint='events/past'
    endedEventsParams.requestType=5;
    endedEventsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(endedEventsParams)
      .subscribe(async (data: EventSummary[]) =>{
        await this.setEventSummary(data)
        await this.processEventAnalytics();
      });

    console.log("fetch events")
  }

  //link analytics data to event summary
  async linkAnalyticsData(){


    for(let event of this.eventsSummary){
      event.event_id=this.count++;
      const analyticsParams=new RequestParams();
      analyticsParams.EndPoint='/views/department/'+event.event_uuid;
      analyticsParams.requestType=5;
      analyticsParams.authToken=this.getHttpOptions();

      this.dataService.httprequest(analyticsParams)
        .subscribe(async (data: ViewsAnalyticsCount[]) =>{
          event.view_count=data;
          //console.log(data)
        });

      const registrationsParams=new RequestParams();
      registrationsParams.EndPoint='registrations/department/'+event.event_uuid;
      registrationsParams.requestType=5;
      registrationsParams.authToken=this.getHttpOptions();

      this.dataService.httprequest(registrationsParams)
        .subscribe(async (data: RegistrationAnalyticsCount[]) =>{
          //await this.addAnalytics(event,data);
          event.registration_count=data;
          //console.log(data)
        });
    }
  }

  mockProcessData(){
  }

  //add all the views in the analytics per event
  sumViewAnalytics(data :ViewsAnalyticsCount[]){
    let sum:number = 0;
    for(let view of data){
      sum += view.views;
    }
    return sum;
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

}
