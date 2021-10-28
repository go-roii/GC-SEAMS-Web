import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomescreenRoutingModule } from './homescreen-routing.module';
import { HomescreenComponent } from './homescreen.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventCardComponent } from './event-card/event-card.component';
import { NewEventCardComponent } from './new-event-card/new-event-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    HomescreenComponent,
    CreateEventComponent,
    DashboardComponent,
    EventCardComponent,
    NewEventCardComponent,
  ],
  imports: [
    CommonModule,
    HomescreenRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class HomescreenModule { }