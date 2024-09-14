  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
import { Project } from '../models/project';

  @Injectable({
    providedIn: 'root'
  })
  export class ProjectService {
    private apiUrl = 'http://localhost:8080/api/projects';

    constructor(private http: HttpClient) { }

    getProjects(): Observable<Project[]> {
      return this.http.get<Project[]>(this.apiUrl);
    }
    
    createProject(project: any): Observable<any> {
      return this.http.post(`${this.apiUrl}`, project); 
    }
      

    getProjectById(id: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/${id}`);
    }
    getProjectGanttData(projectId: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${projectId}/gantt-data`);
    }
  }