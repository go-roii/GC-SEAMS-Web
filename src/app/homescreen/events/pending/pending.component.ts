import {Component, HostBinding, Input, OnInit} from '@angular/core';
import { SidenavExpandService } from 'src/app/services/sidenav-expand.service';
import {EventsToAdd} from "../../../models/EventsToAdd";
import {UserService} from "../../../services/user.service";
import {DataService} from "../../../services/data.service";
import {HttpHeaders} from "@angular/common/http";
import {RequestParams} from "../../../models/RequestParams";
import { UpdatedEventService } from 'src/app/services/updated-event.service';
import { NewEventsService } from 'src/app/services/new-events.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: [
		'../events.component.scss',
		'./pending.component.scss'
	]
})

export class PendingComponent implements OnInit {
  
  newEventsCount = this.newEventsService.newEventsCount;
  newEvents: string[] = [];
  updatedEventUUID: string = this.updatedEventService.updatedEventUUID;

  isSidenavExpanded: boolean = this.sidedenavExpandService.isSidenavExpanded;

  searchText: string='';
  pendingEvents: EventsToAdd[]=[];

  constructor(private router: Router,
              private newEventsService: NewEventsService,
              private updatedEventService: UpdatedEventService,
              private sidedenavExpandService: SidenavExpandService,
              private userService: UserService,
              private dataService: DataService) {
    this.sidedenavExpandService.sidenavExpandChange.subscribe((value) => {
      this.isSidenavExpanded = value;
    });

    console.log(this.newEventsCount)
  }

  ngOnInit(): void {
    this.fetchPendingEvents();
  }

  // add event as newly created to array
  addEventsAsNew() {
    for(let i = this.pendingEvents.length;
      i > this.pendingEvents.length - this.newEventsCount; i--) {
      this.newEvents.push(this.pendingEvents[i-1].event_uuid)
      console.log(this.newEvents[1])
    }
  }

  // highlight newly created event/s
  markEventAsNew(eventUUID: string): boolean {
    for(let i = 0; i < this.newEvents.length; i++)
      if(eventUUID === this.newEvents[i])
        return true

    return false
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

  fetchPendingEvents(){
    const pendingEventsParams=new RequestParams();
    pendingEventsParams.EndPoint='/events/upcoming'
    pendingEventsParams.requestType=5;
    pendingEventsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(pendingEventsParams)
      .subscribe(async (data: EventsToAdd[]) =>{
        await this.setPendingEvents(data);
        await console.log(this.pendingEvents)

        this.addEventsAsNew();
        this.sortPendingEvents();
      });
  }

  setPendingEvents(data: EventsToAdd[]){
    this.pendingEvents=data;
  }

  // chronologically
  sortPendingEvents() {
    this.pendingEvents.sort((a, b) => 
      new Date(a.event_start_date.split("[")[0]).valueOf() - new Date(b.event_start_date.split("[")[0]).valueOf());
  }

}
