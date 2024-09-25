import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { forkJoin, Observable } from 'rxjs';

// Define interfaces for the expected response structure
interface DailyProgress {
  [date: string]: number;
}

interface DailyProductivity {
  [date: string]: number;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  public barChartLegend = true;
  public barChartPlugins = [];
  projectId?: number;
  public isLoading = true; 

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Avancement',
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      },
      {
        data: [],
        label: 'Productivité',
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {
        stacked: false, 
      },
      y: {
        stacked: false, 
      }
    },
  };

  constructor(private route: ActivatedRoute, private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];
      this.loadData();
    });
  }

  loadData(): void {
    this.isLoading = true; 
    forkJoin({
      progress: this.getDailyProgress(),
      productivity: this.getDailyProductivity()
    }).subscribe({
      next: ({ progress, productivity }) => {
        console.log('Progress data:', progress);
        console.log('Productivity data:', productivity);
        this.updateChartData(progress, productivity);
        this.isLoading = false; 
      },
      error: (err) => {
        console.error('Error fetching data', err);
        this.isLoading = false; 
      }
    });
  }
  

  getDailyProgress(): Observable<DailyProgress> {
    return this.http.get<DailyProgress>(`http://localhost:8080/api/kpi/project/${this.projectId}/daily-progress`);
  }

  getDailyProductivity(): Observable<DailyProductivity> {
    return this.http.get<DailyProductivity>(`http://localhost:8080/api/kpi/daily-productivity/${this.projectId}`);
  }

  updateChartData(progressData: DailyProgress, productivityData: DailyProductivity): void {
    const dates = Object.keys(progressData);
    const dailyProgressValues: number[] = Object.values(progressData);
    const dailyProductivityValues: number[] = Object.values(productivityData);
  
    this.barChartData.labels = dates;
  
    console.log('Chart labels:', this.barChartData.labels);
    console.log('Daily progress values:', dailyProgressValues);
    console.log('Daily productivity values:', dailyProductivityValues);
  
    this.barChartData.datasets = [
      {
        data: dailyProgressValues,
        label: 'Avancement',
        barThickness: 50,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        hoverBorderWidth: 3,
        categoryPercentage: 0.8,
        barPercentage: 1.0
      },
      {
        data: dailyProductivityValues,
        label: 'Productivité',
        barThickness: 50,
        backgroundColor: 'rgba(255, 99, 132, 0.6)', 
        borderColor: 'rgba(255, 99, 132, 1)', 
        borderWidth: 2,
        borderRadius: 10,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        hoverBorderWidth: 3,
        categoryPercentage: 0.8,
        barPercentage: 1.0
      }
    ];
  
    this.cdr.detectChanges(); 
  }
  
}
