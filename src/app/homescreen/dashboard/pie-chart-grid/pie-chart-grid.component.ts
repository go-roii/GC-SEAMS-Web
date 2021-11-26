import { Component, OnInit } from '@angular/core';
import { single } from './data';
import {ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-pie-chart-grid',
  templateUrl: './pie-chart-grid.component.html',
  styleUrls: ['./pie-chart-grid.component.scss']
})
export class PieChartGridComponent {

  single!: any[];
  view: any = [1150, 400];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
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
    Object.assign(this, { single });
  }

  onSelect(event: any) {
    console.log(event);
  }

}
