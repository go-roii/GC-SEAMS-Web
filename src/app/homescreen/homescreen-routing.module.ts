import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EndedComponent } from './events/ended/ended.component';
import { EventsComponent } from './events/events.component';
import { OngoingComponent } from './events/ongoing/ongoing.component';
import { PendingComponent } from './events/pending/pending.component';
import { HomescreenComponent } from './homescreen.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'events/ongoing',
  },
  {
    path: '',
    component: HomescreenComponent,
    children: [
      {
        path: 'events',
        component: EventsComponent,
        children: [
          {
            path: 'ongoing',
            component: OngoingComponent
          },
          {
            path: 'pending',
            component: PendingComponent
          },
          {
            path: 'ended',
            component: EndedComponent
          }
        ]
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
