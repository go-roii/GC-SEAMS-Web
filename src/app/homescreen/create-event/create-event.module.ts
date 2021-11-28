import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from './create-event.component';
import { EventCardComponent } from './event-card/event-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEventRoutingModule } from './create-event-routing.module';
import {Ng2SearchPipeModule} from "ng2-search-filter";



@NgModule({
  declarations: [
    CreateEventComponent,
    EventCardComponent,
  ],
    imports: [
        CommonModule,
        CreateEventRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule,
    ]
})
export class CreateEventModule { }
