import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpHeaders} from "@angular/common/http";
import {RequestParams} from "../../models/RequestParams";
import {EventsToAdd} from "../../models/EventsToAdd";
import {UserService} from "../../services/user.service";
import {DataService} from "../../services/data.service";
import {Analytics} from "../../models/Analytics";
import {EventSummary} from "../../models/EventSummary";

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
  public eventsAnalytics!: Analytics[];
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
        await this.setEndedEvents(data)
        await this.linkAnalyticsData();
        await console.log(this.eventsSummary);
      });
  }


  //link analytics data to event summary
  linkAnalyticsData(){
    for(let event of this.eventsSummary){
      event.event_id=this.count++;
      const analyticsParams=new RequestParams();
      analyticsParams.EndPoint='analytics/department/'+event.event_id;
      analyticsParams.requestType=5;
      analyticsParams.authToken=this.getHttpOptions();

      this.dataService.httprequest(analyticsParams)
        .subscribe(async (data: Analytics) =>{
          await this.addAnalytics(event,data);
          event.event_analytics=data;
          await console.log(event);
        });
    }
  }

  //push analytics data to event analytics property
  addAnalytics(event: EventSummary, analytics: Analytics){
    event.event_analytics=analytics;
  }

  setEndedEvents(data: EventSummary[]){
    this.eventsSummary=data;
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
