import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { LessonPlan } from '../../../lesson-plan-upload/lesson-plan';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private isMessagingSendingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isMessagingSending$ = this.isMessagingSendingSubject$.asObservable();

  baseURL = "http://localhost:4000/api";

  constructor(private http: HttpClient) { }

  uploadLessonPlan(lessonPlan: LessonPlan): Observable<any> {
    console.log('in uploadLessonPlan');
    this.isMessagingSendingSubject$.next(true);
    return this.http.post<LessonPlan>(`${this.baseURL}/uploadLessonPlan`, lessonPlan)
      .pipe(
        tap(() => {
          console.log('wtf');
          this.isMessagingSendingSubject$.next(false)
        }),
        catchError((error: any) => {
          this.isMessagingSendingSubject$.next(false);
          let errorMsg: string = '';

          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred.
            errorMsg = `Error: ${error.error.message}`;
          } else {
            // The backend returned an unsuccessful response code.
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
            errorMsg = this.getServerErrorMessage(error);
          }
          // return an observable with a user-facing error message
          return throwError(errorMsg);
        }))
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `404 - Not Found: ${error.message}`;
      }
      case 403: {
        return `403 - Access Denied: ${error.message}`;
      }
      case 500: {
        return `500 - Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }
}
