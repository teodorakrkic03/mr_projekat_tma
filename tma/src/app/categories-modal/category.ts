import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../auth/auth';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://127.0.0.1:8000/api/categories';

  constructor(private http: HttpClient, private auth:Auth){}

  getCategories() : Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });

    return this.http.get(this.apiUrl, { headers })
  }

  addCategory(name:string):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });

    return this.http.post(this.apiUrl, { name }, { headers });
  }

  deleteCategory(id:number):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
