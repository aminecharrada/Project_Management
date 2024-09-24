import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-progressbar-chart',
  templateUrl: './progressbar-chart.component.html',
  styleUrls: ['./progressbar-chart.component.scss']
})
export class ProgressbarChartComponent implements OnInit {
  public barChartLegend = true;
  public barChartPlugins = [];
  projectId?: number;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Progression', backgroundColor: 'rgb(75, 192, 192)' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
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
      this.barChartData.labels = Object.keys(data); // This gets the date labels
      this.barChartData.datasets[0].data = Object.values(data); // This gets the progress values
      console.log(this.barChartData);
      const dates = Object.keys(data).map(date => date.split(' ')[0]);
        const dailyProgressValues = Object.values(data);
      this.barChartData = {
        labels: dates,
        datasets: [
          {
            data: dailyProgressValues,
            label: 'Daily Progress',
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

