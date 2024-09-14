import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-progressbar-chart',
  templateUrl: './progressbar-chart.component.html',
  styleUrls: ['./progressbar-chart.component.scss']
})
export class ProgressbarChartComponent {
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '15-jul', '16-jul', '17-jul', '18-jul', '19-jul', '20-jul', '21-jul' ],
    datasets: [
      // { data: [ 28, 48, 40, 19, 46, 27,36 ], label: 'Avancement',backgroundColor: 'red' },
      { data: [ 25, 29, 44, 53, 62, 71,80 ], label: 'Progression' ,backgroundColor: 'rgb(75, 192, 192)'}
      
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor() {
  }
}
