import { Injectable } from '@angular/core';
import { Auth } from './auth/auth';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class App {
  errorMessage: string | null = null;

  constructor(private auth:Auth,private router: Router){}

  handleLogout(){
    this.auth.logout().subscribe({
      next: (res) => {
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Logout failed';
      }
   })
 }
  
}
