import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '15-jul', '16-jul', '17-jul', '18-jul', '19-jul', '20-jul', '21-jul' ],
    datasets: [
      { data: [ 28, 48, 40, 19, 46, 27,36 ], label: 'Avancement',backgroundColor: 'red' },
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Productivité' }
      
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor() {
  }

}
