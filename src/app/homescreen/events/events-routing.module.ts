import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndedComponent } from './ended/ended.component';
import { EventsComponent } from './events.component';
import { OngoingComponent } from './ongoing/ongoing.component';
import { PendingComponent } from './pending/pending.component';

const routes: Routes = [
  {
  path: '',
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
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
