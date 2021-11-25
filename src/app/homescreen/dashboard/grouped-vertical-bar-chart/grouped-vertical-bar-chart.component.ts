import { Component, OnInit } from '@angular/core';
import { multi } from './data';


@Component({
  selector: 'app-grouped-vertical-bar-chart',
  templateUrl: './grouped-vertical-bar-chart.component.html',
  styleUrls: ['./grouped-vertical-bar-chart.component.scss']
})
export class GroupedVerticalBarChartComponent{

  multi!: any[];
  view: any = [1100, 400];


  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  //gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Departments';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Number of Students';
  legendTitle: string = 'Action';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };


  constructor() {
    Object.assign(this, { multi })
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}

