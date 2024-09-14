import { Component } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(...registerables, annotationPlugin);

@Component({
  selector: 'app-tauxbar-chart',
  templateUrl: './tauxbar-chart.component.html',
  styleUrls: ['./tauxbar-chart.component.scss']
})
export class TauxbarChartComponent {
  public barChartLegend = true;
  public barChartPlugins = [annotationPlugin];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['15-jul', '16-jul', '17-jul', '18-jul', '19-jul', '20-jul', '21-jul'],
    datasets: [
      {
        data: [28, 48, 40, 19, 46, 27, 36],
        label: 'Taux de respect des délais',
        barThickness: 15,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
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
            xMin: '15-jul',
            xMax: '21-jul',
            yMin: 60,
            yMax: 60,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 4,
            label: {
              content: 'Taux du Respect Ref',
              display: true,
              position: 'start',
              backgroundColor: 'rgba(255, 99, 132, 0.8)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              padding: 6,
              // cornerRadius: 4,
              font: {
                size: 14,
                weight: 'bold'
              },
              color: '#fff'
            }
          }
        }
      }
    }
  };

  constructor() { }
}
