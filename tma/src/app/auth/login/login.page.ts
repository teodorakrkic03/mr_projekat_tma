import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth:Auth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // prikaži greške
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const { username, password } = this.loginForm.value;

    this.auth.login(username, password).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.router.navigate(['/tasks']); 
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Login failed';
      },
    });
  }

}
