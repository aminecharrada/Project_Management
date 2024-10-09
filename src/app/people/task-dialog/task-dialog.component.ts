import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  tasks: string[] = [];  // Store the task names
  totalTasks: number = 0; // Store the total number of tasks
  personName: string = ''; // Store the person's name

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.personName = this.data.personName;
    this.loadTasks(this.personName); // Pass the person's name
  }

  loadTasks(personName: string): void {
    this.taskService.getTasksDetailsByPerson(personName).subscribe(
      (response) => {
        this.tasks = response.taskNames; // Set task names
        this.totalTasks = response.totalTasks; // Set total tasks count
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
  
  close(): void {
    this.dialogRef.close();
  }
}
