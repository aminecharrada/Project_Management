import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-ecart-chart',
  templateUrl: './ecart-chart.component.html',
  styleUrls: ['./ecart-chart.component.scss']
})
export class EcartChartComponent implements OnInit {
  public lineChartLegend = true;
  public lineChartPlugins = [annotationPlugin];
  projectId?: number;
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'écart durée',
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        tension: 0.4,
      },
      {
        data: [],
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

  constructor(private route: ActivatedRoute, private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];
    this.fetchEcartData();
  });
  }
  fetchEcartData(): void {
    this.http.get<{ [date: string]: number }>(`http://localhost:8080/api/kpi/project/${this.projectId}/ecart`)
      .subscribe((data: { [date: string]: number }) => {
        // Create an array of entries and sort by date
        const entries = Object.entries(data).map(([date, value]) => ({
          date: new Date(date), // Convert date string to Date object
          value: value
        })).sort((a, b) => a.date.getTime() - b.date.getTime()); // Sort by date
  
        // Extract sorted dates and corresponding eCart values
        const sortedLabels = entries.map(entry => entry.date.toISOString().split('T')[0]); // Format the date as needed
        const sortedEcartDuree = entries.map(entry => parseFloat((entry.value / 1e12).toFixed(1))); // Convert values
  
        // Directly set the labels and datasets
        this.lineChartData = {
          labels: sortedLabels,  // Flat array of sorted labels
          datasets: [
            {
              data: sortedEcartDuree,  // Flat array of sorted data (numbers)
              label: 'écart durée',
              fill: false,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
              tension: 0.4,
            },
            {
              data: Array(sortedLabels.length).fill(0),  // Flat array of zeros for reference data
              label: 'référence',
              fill: false,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 4,
              tension: 0.4,
            }
          ]
        };
  
        this.cdr.detectChanges();  // Ensure change detection
      });
  }
  
  
  
  
  
  
}