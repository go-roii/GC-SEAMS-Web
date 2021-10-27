import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';
import { CreateEventComponent } from './create-event/create-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { EventCardComponent } from './event-card/event-card.component';
import { NewEventCardComponent } from './new-event-card/new-event-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEventComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    HomescreenComponent,
    EventCardComponent,
    NewEventCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
