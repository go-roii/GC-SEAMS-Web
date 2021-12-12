import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {RequestParams} from "../../../models/RequestParams";
import {EventsToAdd} from "../../../models/EventsToAdd";
import {HttpHeaders} from "@angular/common/http";
import {UserService} from "../../../services/user.service";
import {DataService} from "../../../services/data.service";

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
        await console.log(data)
      });
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
