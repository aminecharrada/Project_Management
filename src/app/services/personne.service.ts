  import { Injectable } from '@angular/core';
  import { HttpClient, HttpParams } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Contact } from '../interface/contact';

  @Injectable({
    providedIn: 'root'
  })
  export class PersonneService {

    private apiUrl = 'http://localhost:8080/api/personnes';

    constructor(private http: HttpClient) {}

    getAllPersonnes(): Observable<Contact[]> {
      return this.http.get<Contact[]>(this.apiUrl);
    }

    createPersonne(contact: Contact): Observable<Contact> {
      const formData = new FormData();
      formData.append('name', contact.name);
      formData.append('role', contact.role);
      formData.append('poleName', contact.poleName);
    
      if (contact.image instanceof File) {
        formData.append('image', contact.image);
      }

      return this.http.post<Contact>(this.apiUrl, formData);
    }

    // Method to delete a single Personne
    deletePersonne(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Method to delete multiple Personnes
    deleteMultiplePersonnes(ids: number[]): Observable<void> {
      return this.http.post<void>(`${this.apiUrl}/delete-multiple`, ids);
    }
  }
