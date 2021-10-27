import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from '../create-event/create-event.component';
import { HomeComponent } from '../home/home.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '../home',
    component: HomeComponent,
  },
  {
    path: '../create-event',
    component: CreateEventComponent,
  },
  {
    path: '../dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class HomescreenRoutingModule { }
