import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getNotes(){
    return this.httpClient.get(environment.apiBaseUrl);
  }

  public deleteNote(id: string){
    return this.httpClient.delete(`${environment.apiBaseUrl}/${id}`);
  }

  public createNote(data: {title: string | null; content: string | null}){
    return this.httpClient.post(`${environment.apiBaseUrl}`, data);
  }

  public updateNote(data: {title: string | null; content: string | null; id: string | null}){
    return this.httpClient.put(
      `${environment.apiBaseUrl}/${data.id}`,
      {
        title: data.title,
        content: data.content
      }
    );
  }
}
