import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import zoomPlugin from 'chartjs-plugin-zoom';

@Component({
  selector: 'app-progressbar-chart',
  templateUrl: './progressbar-chart.component.html',
  styleUrls: ['./progressbar-chart.component.scss']
})
export class ProgressbarChartComponent implements OnInit {
  public barChartLegend = true;
  projectId?: number;
  public barChartPlugins = [zoomPlugin]; 

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Progression', backgroundColor: 'rgb(75, 192, 192)' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.2)' // Gridline color
        }
      }
    },
    plugins: {
      legend: {
        display: true, // Show legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
      zoom: {
        pan:{
          enabled:true,
          mode: 'x'
        }
      }
    }
  };

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];
      this.fetchDailyProgress();
    });
  }

  fetchDailyProgress(): void {
    this.http.get<Map<string, number>>(`http://localhost:8080/api/kpi/project/${this.projectId}/daily-progress`).subscribe(data => {
      // Create an array of entries and sort by date
      const entries = Object.entries(data).map(([date, value]) => ({
        date: new Date(date), // Convert date string to Date object
        value: value
      })).sort((a, b) => a.date.getTime() - b.date.getTime()); // Sort by date
  
      // Extract sorted dates and corresponding progress values
      const sortedDates = entries.map(entry => entry.date.toISOString().split('T')[0]); // Format the date as needed
      const sortedValues = entries.map(entry => entry.value);
  
      // Update chart data with sorted dates and values
      this.barChartData = {
        labels: sortedDates,
        datasets: [
          {
            data: sortedValues,
            label: 'Progression',
            barThickness: 50,
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Light blue
            borderColor: 'rgba(54, 162, 235, 1)', // Darker blue
            borderWidth: 2,
            borderRadius: 10,
            hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
            hoverBorderColor: 'rgba(54, 162, 235, 1)',
            hoverBorderWidth: 3,
            categoryPercentage: 0.8,
            barPercentage: 1.0
          }
        ]
      };
    });
  }
  
}
