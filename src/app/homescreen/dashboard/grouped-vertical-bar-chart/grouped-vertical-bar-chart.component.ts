import {Component} from '@angular/core';
import {multi} from './data';
import {Color, LegendPosition, ScaleType} from "@swimlane/ngx-charts";



@Component({
  selector: 'app-grouped-vertical-bar-chart',
  templateUrl: './grouped-vertical-bar-chart.component.html',
  styleUrls: ['./grouped-vertical-bar-chart.component.scss']
})
export class GroupedVerticalBarChartComponent{

  multi!: any[];
  view: any = [1150, 350];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  //gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Departments';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Number of Students';
  legendTitle: string = 'Legend';
  legendPosition= LegendPosition.Below

  colorScheme: Color = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#647c8a',
      '#3f51b5',
      '#2196f3',
      '#00b862',
      '#afdf0a',
      '#a7b61a',
      '#f3e562',
      '#ff9800',
      '#ff5722',
      '#ff4514'
    ]
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

