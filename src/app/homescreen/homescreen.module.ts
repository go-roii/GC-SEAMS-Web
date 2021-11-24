import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomescreenRoutingModule } from './homescreen-routing.module';
import { HomescreenComponent } from './homescreen.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsEventCardComponent } from './events/event-card/events-event-card.component';
import { EventCardComponent } from './create-event/event-card/event-card.component';
import { NewEventCardComponent } from './create-event/new-event-card/new-event-card.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EventsComponent } from './events/events.component';
import { OngoingComponent } from './events/ongoing/ongoing.component';
import { PendingComponent } from './events/pending/pending.component';
import { EndedComponent } from './events/ended/ended.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';



@NgModule({
  declarations: [
    HomescreenComponent,
    EventsComponent,
    CreateEventComponent,
    DashboardComponent,
		EventsEventCardComponent,
    EventCardComponent,
    NewEventCardComponent,
    OngoingComponent,
    PendingComponent,
    EndedComponent,
    EditEventComponent,
    AnalyticsComponent,
  ],
    imports: [
        CommonModule,
        HomescreenRoutingModule,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class HomescreenModule { }
