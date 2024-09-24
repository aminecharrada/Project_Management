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

  constructor(private route: ActivatedRoute,private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];
    this.fetchDailyProgress();
  });
  }

  fetchDailyProgress(): void {
    
    this.http.get<Map<string, number>>(`/api/kpi/project/${this.projectId}/daily-progress`).subscribe(data => {
      this.barChartData.labels = Object.keys(data);
      this.barChartData.datasets[0].data = Object.values(data);
      console.log(this.barChartData)
    });
  }
}
