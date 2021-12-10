import {Component, HostBinding, Input, OnInit} from '@angular/core';
import { SidenavExpandService } from 'src/app/services/sidenav-expand.service';
import {EventsToAdd} from "../../../models/EventsToAdd";
import {UserService} from "../../../services/user.service";
import {DataService} from "../../../services/data.service";
import {HttpHeaders} from "@angular/common/http";
import {RequestParams} from "../../../models/RequestParams";

@Component({
  selector: 'app-ended',
  templateUrl: './ended.component.html',
  styleUrls: [
		'../events.component.scss',
		'./ended.component.scss'
	]
})

export class EndedComponent implements OnInit {

  searchText: string='';

  endedEvents: EventsToAdd[]=[];
  isSidenavExpanded: boolean = this.sidedenavExpandService.isSidenavExpanded;

  constructor(private sidedenavExpandService: SidenavExpandService,
              private userService: UserService,
              private dataService: DataService) {
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

  fetchEndedEvents(){
    const endedEventsParams=new RequestParams();
    endedEventsParams.EndPoint='/events/past'
    endedEventsParams.requestType=5;
    endedEventsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(endedEventsParams)
      .subscribe(async (data: EventsToAdd[]) =>{
        await this.setEndedEvents(data);
        await console.log(this.endedEvents)
      });
  }

  setEndedEvents(data: EventsToAdd[]){
    this.endedEvents=data;
  }

  ngOnInit(): void {
    this.fetchEndedEvents();
  }
}
