  import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
  import { ProjectService } from '../services/project.service';
  import { MatDialog } from '@angular/material/dialog';
  import { Methods } from '../enums/enums';
  import { MatTable, MatTableDataSource } from '@angular/material/table';
  import { Project } from '../models/project';
  import { MatDialogProjectComponent } from './mat-dialog-project/mat-dialog-project.component';
  import { ChangeDetectorRef } from '@angular/core';

  @Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
  })
  export class ProjectsComponent implements OnInit, AfterViewInit {
    private baseUrl = 'http://localhost:8080/api/personnes/images/'; 

    projects: Project[] = [];
    contactsDataSource = new MatTableDataSource<Project>(this.projects);

    getImageUrl(imageName: string | null): string {
      const url = imageName ? `${this.baseUrl}${imageName}` : 'assets/default-avatar.png';
      return url;
    }
    
    @ViewChild(MatTable, { static: false }) table!: MatTable<any>;
    @Input() readonly!: boolean;
    @Output() onPoleAdded: EventEmitter<Project> = new EventEmitter<Project>();
    @Output() onAddingNewContactCanceled: EventEmitter<void> = new EventEmitter<void>();
    methods = Methods;

    constructor(private projectService: ProjectService, public dialog: MatDialog,
      private cdRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
      this.projectService.getProjects().subscribe({
        next: (data) => {
          this.projects = data;
          console.log('Projects Data:', this.projects);
          this.contactsDataSource.data = this.projects;
          this.cdRef.detectChanges();
        },
        error: (err) => {
          console.error('An error occurred:', err);
          // Optionally, display a user-friendly message or handle the error as needed
        }
      });
    }
    
  

    ngAfterViewInit(): void {
      // Safeguard to ensure the table is defined before calling renderRows
      if (this.table) {
        this.table.renderRows();
      }
    }

    add(project: Project) {
      this.contactsDataSource.data = [project, ...this.contactsDataSource.data];
      this.onPoleAdded.emit(project);
      if (this.table) {
        this.table.renderRows();
      }
    } 

    openAddProjectDialogContainer(method: Methods): void {
      const dialogRef = this.dialog.open(MatDialogProjectComponent, {
        data: { method: method }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const methodFromResult: Methods = result.method;
          const projectFromResult: Project = result.project;
          if (methodFromResult === Methods.POST) {
            this.add(projectFromResult);
          } else {
            this.onAddingNewContactCanceled.emit();
          }
        }
      });
    }
  }
