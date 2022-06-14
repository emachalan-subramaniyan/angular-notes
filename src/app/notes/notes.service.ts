import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiURL = environment.apiBaseUrl;
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteNote(id: string | undefined | null){
    return this.httpClient.delete<Note>(`${this.apiURL}/${id}`, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createNote(post: Note): Observable<Note> {
    return this.httpClient.post<Note>(this.apiURL, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  updateNote(data: Note): Observable<Note> {
    return this.httpClient.put<Note>(`${this.apiURL}/${data.id}`, {
      title: data.title,
      content: data.content
    }, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  findNote(id: string): Observable<Note> {
    return this.httpClient.get<Note>(`${this.apiURL}/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
