import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndedComponent } from './ended/ended.component';
import { EventsComponent } from './events.component';
import { EventsEventCardComponent } from './event-card/events-event-card.component';
import { OngoingComponent } from './ongoing/ongoing.component';
import { PendingComponent } from './pending/pending.component';
import { EventsRoutingModule } from './events-routing.module';
import { EventDetailsComponent } from './event-details/event-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";



@NgModule({
  declarations: [
    EventsComponent,
		EventsEventCardComponent,
    EventDetailsComponent,
    OngoingComponent,
    PendingComponent,
    EndedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EventsRoutingModule,
    Ng2SearchPipeModule
  ]
})
export class EventsModule { }
