        import { Injectable } from '@angular/core';
        import { Task } from '../models/task';
        import { TaskDto } from '../models/TaskDto'; 
        import { HttpClient } from '@angular/common/http';
        import { HandleError } from './service-helper';
        import { Observable } from 'rxjs';
        import { catchError } from 'rxjs/operators';

        @Injectable()
        export class TaskService {
            private taskUrl = 'http://localhost:8080/api/tasks';

            constructor(private http: HttpClient) {}

            getTasksByPoleId(poleId: number): Observable<Task[]> {
                return this.http.get<Task[]>(`${this.taskUrl}/pole/${poleId}`)
                    .pipe(catchError(HandleError));
            }   
            getTasksByPoleName(poleName: string): Observable<Task[]> {
                return this.http.get<Task[]>(`${this.taskUrl}/pole/${poleName}`)
                    .pipe(catchError(HandleError));
            }
            
            getTasksByProjectName(projectName: string): Observable<Task[]> {
                return this.http.get<Task[]>(`${this.taskUrl}/project?projectName=${projectName}`)
                .pipe(catchError(HandleError));
            }
            getAllTasks(): Observable<TaskDto[]> {
                return this.http.get<TaskDto[]>(this.taskUrl);
            }
            getTasksDetailsByPerson(name: string): Observable<{ totalTasks: number; taskNames: string[] }> {
                return this.http.get<{ totalTasks: number; taskNames: string[] }>(`${this.taskUrl}/tasks/person/${name}/details`)
                    .pipe(catchError(HandleError));
            }
            

            createTask(taskDto: TaskDto, projectName: string): Observable<Task> {
                console.log('Creating task with data:', taskDto);
                return this.http.post<Task>(`http://localhost:8080/api/tasks/gantt?projectName=${projectName}`, taskDto);
            }
            
            
            
            update(taskDto: TaskDto, id: number): Observable<Task> {
                return this.http.put<Task>(`${this.taskUrl}/${id}`, taskDto)
                    .pipe(catchError(HandleError));
            }
            

            remove(id: number): Observable<void> {
                return this.http.delete<void>(`${this.taskUrl}/${id}`)
                    .pipe(catchError(HandleError));
            }

            getAllPersonnes(): Observable<any[]> {
                return this.http.get<any[]>('http://localhost:8080/api/personnes')
                    .pipe(catchError(HandleError));
            }
            getTaskStatus(projectId: number): Observable<any> {
                return this.http.get<any>(`${this.taskUrl}/${projectId}/tasks-status`);
              }
        }
