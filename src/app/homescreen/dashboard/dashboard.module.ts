import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { GroupedVerticalBarChartComponent } from './grouped-vertical-bar-chart/grouped-vertical-bar-chart.component';



@NgModule({
  declarations: [
    DashboardComponent,
    GroupedVerticalBarChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
