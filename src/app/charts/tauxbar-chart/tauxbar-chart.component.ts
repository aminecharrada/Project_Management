import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tauxbar-chart',
  templateUrl: './tauxbar-chart.component.html',
  styleUrls: ['./tauxbar-chart.component.scss']
})
export class TauxbarChartComponent implements OnInit {
  public barChartLegend = true;
  public barChartPlugins = [annotationPlugin];
  projectId?: number;
  respectDelais?: number;


  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [], // Will be dynamically updated
    datasets: [
      {
        data: [], // Will be dynamically updated
        label: 'Taux de respect des délais',
        barThickness: 15,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true, // Make it responsive
    maintainAspectRatio: false, // Don't maintain the aspect ratio
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    },
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 100,
            yMax: 100,
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
  
  

  constructor(private route: ActivatedRoute, private http: HttpClient, private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId']; // Get the project ID from URL
      this.fetchRespectDesDelais();
    });
  }

  fetchRespectDesDelais(): void {
    this.http.get<{ [date: string]: number }>(`http://localhost:8080/api/kpi/project/${this.projectId}/respect-delais`)
      .subscribe((data: { [date: string]: number }) => {
        // Create an array of entries and sort by date
        const entries = Object.entries(data).map(([date, value]) => ({
          date: new Date(date), // Convert date string to Date object
          value: value
        })).sort((a, b) => a.date.getTime() - b.date.getTime()); // Sort by date
  
        // Extract sorted dates and corresponding respect delay values
        const sortedDates = entries.map(entry => entry.date.toISOString().split('T')[0]); // Format the date as needed
        const sortedRespectDelaisValues = entries.map(entry => entry.value);
  
        // Update chart data with sorted dates and values
        this.barChartData = {
          labels: sortedDates,
          datasets: [
            {
              data: sortedRespectDelaisValues,
              label: 'Taux de respect des délais',
              barThickness: 25,
              backgroundColor: 'rgba(75, 192, 192, 0.6)', // Light teal
              borderColor: 'rgba(75, 192, 192, 1)', // Darker teal
              borderWidth: 2,
              borderRadius: 10,
              hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
              hoverBorderColor: 'rgba(75, 192, 192, 1)',
              hoverBorderWidth: 3,
              categoryPercentage: 0.8,
              barPercentage: 1.0
            }
          ]
        };
  
        this.cdr.detectChanges();
      });
  }
  
  
  
}
