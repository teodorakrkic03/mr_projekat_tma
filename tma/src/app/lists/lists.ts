import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../auth/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Lists {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private auth: Auth) {}

  getLists(): Observable<{task_lists:List[]}> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });

    return this.http.get<{task_lists:List[]}>(`${this.apiUrl}/task_lists`, { headers });
  }

  getList(listId: number): Observable<List> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });

    return this.http.get<List>(`${this.apiUrl}/task_lists/${listId}`, { headers });
  }
}
