import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomescreenRoutingModule } from './homescreen-routing.module';
import { HomescreenComponent } from './homescreen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEventComponent } from './edit-event/edit-event.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';



@NgModule({
  declarations: [
    HomescreenComponent,
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
