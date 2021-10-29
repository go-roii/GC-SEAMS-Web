import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomescreenRoutingModule } from './homescreen-routing.module';
import { HomescreenComponent } from './homescreen.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventCardComponent } from './create-event/event-card/event-card.component';
import { NewEventCardComponent } from './create-event/new-event-card/new-event-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsComponent } from './events/events.component';



@NgModule({
  declarations: [
    HomescreenComponent,
    EventsComponent,
    CreateEventComponent,
    DashboardComponent,
    EventCardComponent,
    NewEventCardComponent,
  ],
  imports: [
    CommonModule,
    HomescreenRoutingModule,
    ReactiveFormsModule,
  ],
})
export class HomescreenModule { }
