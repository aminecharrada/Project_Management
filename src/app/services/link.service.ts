import { Injectable } from '@angular/core';
import { Link } from '../models/link';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LinkService {
    private linkUrl = 'http://localhost:8080/api/links';

    constructor(private http: HttpClient) {}

    getAllLinks(): Observable<Link[]> {
        return this.http.get<Link[]>(this.linkUrl)
            .pipe(catchError(this.handleError));
    }

    insert(link: Link): Observable<Link> {
        return this.http.post<Link>(this.linkUrl, link)
            .pipe(catchError(this.handleError));
    }

    update(link: Link): Observable<void> {
        return this.http.put<void>(`${this.linkUrl}/${link.id}`, link)
            .pipe(catchError(this.handleError));
    }

    remove(id: number): Observable<void> {
        return this.http.delete<void>(`${this.linkUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return throwError('Something bad happened; please try again later.');
    }
}
