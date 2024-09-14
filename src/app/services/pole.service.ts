  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Pole } from '../models/pole';

  @Injectable({
    providedIn: 'root'
  })
  export class PoleService {
    private baseUrl = 'http://localhost:8080/api/poles';

    constructor(private http: HttpClient) { }
    
    getPolesByProjectId(projectId: number): Observable<Pole[]> {
      return this.http.get<Pole[]>(`${this.baseUrl}/project/${projectId}`);
    }

    getPolesByProjectName(projectName: string): Observable<Pole[]> {
      return this.http.get<Pole[]>(`${this.baseUrl}/byProjectName/${projectName}`);
    }
    createPole(pole: any): Observable<any> {
      return this.http.post(`${this.baseUrl}`, pole); 
    }
    uploadPoleImage(pole: Pole, file: File): Observable<Pole> {
      const formData: FormData = new FormData();
      formData.append('poleName', pole.poleName);
      formData.append('elemPole', pole.elemPole);
      formData.append('file', file);

      return this.http.post<Pole>(`${this.baseUrl}/upload`, formData);
    }
    getAllPoles(): Observable<Pole[]> {
      return this.http.get<Pole[]>(this.baseUrl);
    }
  }
