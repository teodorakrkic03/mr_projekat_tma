import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../auth/auth';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl = 'http://127.0.0.1:8000/api/tasks';
  
  constructor(private http: HttpClient, private auth: Auth){}

  private getHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    };
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<{tasks: Task[]}>(this.apiUrl, this.getHeaders()).pipe(
      map(res => res.tasks)
    );
  }

  getTask(taskId: string | number) {
    return this.http.get<{task: Task}>(`${this.apiUrl}/${taskId}`, this.getHeaders()).pipe(
      map(res => res.task)
    );
  }

  addTask(taskData: Partial<Task>): Observable<any> {
    return this.http.post(this.apiUrl, taskData, this.getHeaders());
  }

  updateTask(taskId: number, taskData: Partial<Task>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${taskId}`, taskData, this.getHeaders());
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${taskId}`, this.getHeaders());
  }

  filterTasks(filters: any): Observable<Task[]> {
    return this.http.post<{tasks: Task[]}>(`${this.apiUrl}/filter`, filters, this.getHeaders()).pipe(
      map(res => res.tasks));
  }
}
