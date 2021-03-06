import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { GroupedVerticalBarChartComponent } from './grouped-vertical-bar-chart/grouped-vertical-bar-chart.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { PieChartGridComponent } from './pie-chart-grid/pie-chart-grid.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AnalyticsComponent,
    GroupedVerticalBarChartComponent,
    PieChartGridComponent
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
