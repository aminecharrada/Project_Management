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
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    },
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: 'line',
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
      this.fetchDailyProgress();
    });
  }

  fetchDailyProgress(): void {
    this.http.get<{ [date: string]: number }>(`http://localhost:8080/api/kpi/project/${this.projectId}/daily-progress`)
    .subscribe((data: { [date: string]: number }) => {
        const dates = Object.keys(data).map(date => date.split(' ')[0]);
        const dailyProgressValues = Object.values(data);
        
        this.barChartData = {
            labels: dates,
            datasets: [
                {
                    data: dailyProgressValues,
                    label: 'Daily Progress',
                    barThickness: 15,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        };
        this.cdr.detectChanges();
    });
}

  
  
}
