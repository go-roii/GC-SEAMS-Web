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
  count: number = 1;

  constructor(private router : Router,
              private userService: UserService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchEndedEvents();
  }

  open_analytics_page() {
    console.log('test')
    this.router.navigate(['homescreen/dashboard/analytics'],
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
        //await console.log(this.eventsSummary);
      });
  }

  //link analytics data to event summary
  linkAnalyticsData(){
    for(let event of this.eventsSummary){
      event.event_id=this.count++;
      const analyticsParams=new RequestParams();
      analyticsParams.EndPoint='/views/department/'+event.event_uuid;
      analyticsParams.requestType=5;
      analyticsParams.authToken=this.getHttpOptions();

      this.dataService.httprequest(analyticsParams)
        .subscribe(async (data: ViewsAnalyticsCount[]) =>{
          //await this.addAnalytics(event,data);
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

  //add all the views in the analytics
  sumViewAnalytics(data :ViewsAnalyticsCount[]){
    let sum:number = 0;
    for(let view of data){
      sum += view.views;
    }
    return sum;
  }

  //add all the views in the analytics
  sumRegistrantsAnalytics(data :RegistrationAnalyticsCount[]){
    let sum:number = 0;
    for(let registrants of data){
      sum += registrants.registrations;
    }
    return sum;
  }

  setEventSummary(data: EventSummary[]){
    this.eventsSummary=data;
    this.linkAnalyticsData();
    console.log('events summary:---------------------------------------------------------');
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
