import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.css']
})
export class GridComponentComponent implements OnInit {
  progressValue: number = 0; 
  projectId?: number;  

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId']; 
      this.fetchDailyProgress();
    });
  }

  fetchDailyProgress(): void {
    if (this.projectId) {
      this.http.get<{ [key: string]: number }>(`http://localhost:8080/api/kpi/project/${this.projectId}/daily-progress`)
        .subscribe(
          (data) => {
            const dates = Object.keys(data).sort(); 
            const lastDate = dates[dates.length - 1]; 

            console.log("Latest Date:", lastDate);
            console.log("Progress Data:", data);
            if (lastDate && data[lastDate] !== undefined) {
              const latestProgressValue = Math.floor(data[lastDate]); 
              this.updateProgress(latestProgressValue); 
            }
          },
          (error) => {
            console.error('Error fetching progress data:', error);
          }
        );
    }
  }

  updateProgress(newValue: number): void {
    this.progressValue = newValue; 
  }
}
