import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-ecart-chart',
  templateUrl: './ecart-chart.component.html',
  styleUrls: ['./ecart-chart.component.scss']
})
export class EcartChartComponent {
  public lineChartLegend = true;
  public lineChartPlugins = [annotationPlugin];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['15-Jul', '16-Jul', '17-Jul', '18-Jul', '19-Jul', '20-Jul', '21-Jul', '22-Jul', '23-Jul'],
    datasets: [
      {
        data: [-0.9, -0.6, -0.5, -0.4, -0.3, 0, 0.1, 0.3, 0.4],
        label: 'écart durée',
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        tension: 0.4,
      },
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'référence',
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        tension: 0.4,
      }
    ]
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 0,
            yMax: 0,
            borderColor: 'green',
            borderWidth: 2,
            label: {
              content: 'référence',
              display: true,
              position: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white'
            }
          }
        }
      }
    }
  };

  constructor() { }
}
