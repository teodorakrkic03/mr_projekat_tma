import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../auth/auth';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Tasks {
  private apiUrl = 'http://127.0.0.1:8000/api';
  
  constructor(private http: HttpClient, private auth: Auth){}

  getTasks(search?: string): Observable<Task[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });

    let url = `${this.apiUrl}/tasks`;
    if(search){
      url += `?search=${search}`;
    }

    return this.http.get<{tasks: Task[]}>(url, { headers }).pipe(
        map(res => res.tasks)
      );
  }

  getTask(taskId: string | number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });

    return this.http.get<{task: Task}>(`${this.apiUrl}/tasks/${taskId}`, { headers }).pipe(
      map(res => res.task)
    );
  }
}
