import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../auth/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private auth: Auth) {}

  private getHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    };
  }

  getLists(): Observable<{task_lists:List[]}> {
    return this.http.get<{task_lists:List[]}>(`${this.apiUrl}/task_lists`, this.getHeaders());
  }

  getList(listId: string | number): Observable<List> {
    return this.http.get<{task_list: List}>(`${this.apiUrl}/task_lists/${listId}`, this.getHeaders()).pipe(
      map(res => res.task_list)
    );
  }

  createList(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/task_lists`, { name }, this.getHeaders());
  }

  updateList(listId: number, data: { name: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/task_lists/${listId}`, data, this.getHeaders());
  }

  deleteList(listId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/task_lists/${listId}`, this.getHeaders());
  }

  addTaskToList(task_list_id: number, task_id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/lists`, { task_list_id, task_id }, this.getHeaders());
  }

  removeTaskFromList(task_list_id: number, task_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/lists/${task_list_id}/${task_id}`, this.getHeaders());
  }
}
