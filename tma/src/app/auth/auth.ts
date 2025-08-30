import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private currentUser = new BehaviorSubject<any>(null);
  private token:string | null = null;

  constructor(private http: HttpClient){}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((res: any) => {
        if (res.success) {
          this.token = res.access_token;
          localStorage.setItem('token', this.token as string);
          this.currentUser.next(res.user);
        }
      })
    );
  }

  register(first_name: string, last_name: string, username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { first_name, last_name, username, email, password });
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        this.token = null;
        localStorage.removeItem('token');
        this.currentUser.next(null);
      })
    );
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }
  
}
