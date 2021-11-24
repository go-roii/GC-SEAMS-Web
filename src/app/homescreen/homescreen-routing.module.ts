import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { EditEventComponent } from './edit-event/edit-event.component';
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
        redirectTo: 'events/ongoing',
      },
      {
        path: 'events',
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule),
      },
      {
        path: 'create-event',
        loadChildren: () => import('./create-event/create-event.module').then(m => m.CreateEventModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'edit-event',
        component: EditEventComponent
      },
      {
        path: 'dashboard/analytics',
        component: AnalyticsComponent
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
