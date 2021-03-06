import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { SidenavExpandService } from 'src/app/services/sidenav-expand.service';
import {EventsToAdd} from "../../../models/EventsToAdd";
import {HttpHeaders} from "@angular/common/http";
import {UserService} from "../../../services/user.service";
import {RequestParams} from "../../../models/RequestParams";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.component.html',
  styleUrls: [
		'../events.component.scss',
		'./ongoing.component.scss'
	]
})
export class OngoingComponent implements OnInit {

  searchText: string='';
  ongoingEvents: EventsToAdd[]=[];

  isSidenavExpanded: boolean = this.sidedenavExpandService.isSidenavExpanded;

  constructor(private sidedenavExpandService: SidenavExpandService,
              private userService: UserService,
              private dataService: DataService
  ) {
    this.sidedenavExpandService.sidenavExpandChange.subscribe((value) => {
      this.isSidenavExpanded = value;
    });
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

  fetchOngoingEvents(){
    const ongoingEventsParams=new RequestParams();
    ongoingEventsParams.EndPoint='/events/ongoing'
    ongoingEventsParams.requestType=5;
    ongoingEventsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(ongoingEventsParams)
      .subscribe(async (data: EventsToAdd[]) =>{
        await this.setOngoingEvents(data);
        await console.log(this.ongoingEvents)

        //sort event from latest to oldest
        this.ongoingEvents.sort((a, b) => 
          new Date(a.event_start_date.split("[")[0]).valueOf() - new Date(b.event_start_date.split("[")[0]).valueOf());
      });
  }

  setOngoingEvents(data: EventsToAdd[]){
    this.ongoingEvents=data;
  }

  ngOnInit(): void {
    this.fetchOngoingEvents();
  }

}
