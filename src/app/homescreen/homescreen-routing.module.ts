import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
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
        path: 'event-details',
        component: EventDetailsComponent
      },
      {
        path: 'dashboard/analytics',
        component: AnalyticsComponent
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomescreenRoutingModule { }
