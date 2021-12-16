import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
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

  tabNames: string[] = [];
  currentTab: string = 'ongoing';
  name: string ='Mark Jason D. Margallo';

  constructor(public breakpointObserver: BreakpointObserver,) { }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 575.98px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) 
          this.tabNames = ['Ongoing', 'Upcoming', 'Past']
        else 
          this.tabNames = ['Ongoing Events', 'Upcoming Events', 'Past Events']
      });
  }

  public onRouterOutletActivate(event : any) {
    if(event instanceof OngoingComponent)
      this.currentTab = 'ongoing'
    else if(event instanceof PendingComponent)
      this.currentTab = 'upcoming'
    else if(event instanceof EndedComponent)
      this.currentTab = 'past';
  }
}
