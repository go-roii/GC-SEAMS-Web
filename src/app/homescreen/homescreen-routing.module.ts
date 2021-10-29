import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { HomescreenComponent } from './homescreen.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'events',
  },
  {
    path: '',
    component: HomescreenComponent,
    children: [
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'create-event',
        component: CreateEventComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomescreenRoutingModule { }
