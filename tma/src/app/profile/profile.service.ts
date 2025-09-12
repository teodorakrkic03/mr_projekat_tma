import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Auth } from '../auth/auth';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = 'http://127.0.0.1:8000/api/user';

  constructor(private http: HttpClient, private auth: Auth) {}

  private headers(): { headers: HttpHeaders } {
    return { headers: new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` }) };
  }

  getMe(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.headers());
  }

  updateMe(data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, data, this.headers());
  }

  deleteMe(): Observable<any> {
    return this.http.delete<any>(this.apiUrl, this.headers());
  }
}



