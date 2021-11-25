import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { GroupedVerticalBarChartComponent } from './grouped-vertical-bar-chart/grouped-vertical-bar-chart.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";



@NgModule({
  declarations: [
    DashboardComponent,
    GroupedVerticalBarChartComponent
  ],
  exports: [
    GroupedVerticalBarChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxChartsModule
  ]
})
export class DashboardModule { }
