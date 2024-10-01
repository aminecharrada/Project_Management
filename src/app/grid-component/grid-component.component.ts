import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.css']
})
export class GridComponentComponent implements OnInit {
  progressValue: number = 0; 
  projectId?: number;  

  constructor(private route: ActivatedRoute, private http: HttpClient,private taskservive: TaskService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId']; 
      this.fetchDailyProgress();
    });
    this.loadTaskStatus();
  }

  fetchDailyProgress(): void {
    if (this.projectId !== undefined) {
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
    } else {
      console.error('Project ID is undefined');
    }
  }
  

  updateProgress(newValue: number): void {
    this.progressValue = newValue; 
  }
  // Set this dynamically based on the selected project
  completedTasks = 0;
  incompleteTasks = 0;

  loadTaskStatus(): void {
  if (this.projectId !== undefined) {
    this.taskservive.getTaskStatus(this.projectId).subscribe(status => {
      this.completedTasks = status.completed;
      this.incompleteTasks = status.incomplete;
    });
  } else {
    console.error('Project ID is undefined');
  }
}

}
