import { catchError, throwError } from 'rxjs';

export function HandleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
}
