import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {RequestParams} from "../../../models/RequestParams";
import {EventsToAdd} from "../../../models/EventsToAdd";
import {HttpHeaders} from "@angular/common/http";
import {UserService} from "../../../services/user.service";
import {DataService} from "../../../services/data.service";
import {AnalyticsByDepartment} from "../../../models/AnalyticsByDepartment";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: [
    '../../homescreen.component.scss',
    './analytics.component.scss'
  ]
})
export class AnalyticsComponent implements OnInit {

  activeEventUUID!: Subscription;
  uuid!: string;
  activeEvent!: EventsToAdd
  departmentAnalytics!: AnalyticsByDepartment[];
  multi: any[] = [];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.activeEventUUID = this.route.params.subscribe(params => {
      this.uuid = params['uuid'];
    });

    this.getEventDetails(this.uuid)


    console.log(this.uuid);
  }

  getEventDetails(uuid: string){
    const eventDetailsParams=new RequestParams();
    eventDetailsParams.EndPoint='event/'+uuid;
    eventDetailsParams.requestType=5;
    eventDetailsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(eventDetailsParams)
      .subscribe(async (data: EventsToAdd) =>{
        this.activeEvent=data;
        await this.getEventAnalyticsByDepartment(uuid);
        await console.log(data)
      });
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

  //get the headers to be used in the request
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

}
