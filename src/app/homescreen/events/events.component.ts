import { Component, OnInit } from '@angular/core';
import { EndedComponent } from './ended/ended.component';
import { OngoingComponent } from './ongoing/ongoing.component';
import { PendingComponent } from './pending/pending.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  currentTab: string = 'ongoing';
  name:string='Mark Jason D. Margallo'

  constructor() { }

  ngOnInit(): void {
  }

  public onRouterOutletActivate(event : any) {
    if(event instanceof OngoingComponent)
      this.currentTab = 'ongoing'
    else if(event instanceof PendingComponent)
      this.currentTab = 'pending'
    else if(event instanceof EndedComponent)
      this.currentTab = 'ended';
  }
}
