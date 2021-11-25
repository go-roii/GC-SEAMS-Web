import { Component, HostBinding, OnInit } from '@angular/core';
import { SidenavExpandService } from 'src/app/services/sidenav-expand.service';
import {EventsToAdd} from "../../../models/EventsToAdd";
import {UserService} from "../../../services/user.service";
import {DataService} from "../../../services/data.service";
import {HttpHeaders} from "@angular/common/http";
import {RequestParams} from "../../../models/RequestParams";

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})

export class PendingComponent implements OnInit {

  pendingEvents: EventsToAdd[]=[];
  isSidenavExpanded: boolean = this.sidedenavExpandService.isSidenavExpanded;
  @HostBinding('className') componentClass: string = this.isSidenavExpanded ? 'row g-3' : 'row g-4';

  constructor(private sidedenavExpandService: SidenavExpandService,
              private userService: UserService,
              private dataService: DataService) {

    this.sidedenavExpandService.sidenavExpandChange.subscribe((value) => {
      this.isSidenavExpanded = value;
      this.isSidenavExpanded ? this.componentClass = 'row g-3' : this.componentClass = 'row g-4';
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

  fetchPendingEvents(){
    const pendingEventsParams=new RequestParams();
    pendingEventsParams.EndPoint='/events/upcoming'
    pendingEventsParams.requestType=5;
    pendingEventsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(pendingEventsParams)
      .subscribe(async (data: EventsToAdd[]) =>{
        await this.setPendingEvents(data);
        await console.log(this.pendingEvents)
      });
  }

  setPendingEvents(data: EventsToAdd[]){
    this.pendingEvents=data;
  }

  ngOnInit(): void {
    this.fetchPendingEvents();
  }


}
