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
  errors: { [key: string]: string[] } = {}

  constructor(
    private fb: FormBuilder,
    private auth:Auth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['', [Validators.required]]
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
        if (err.status === 422 && err.error) {
          this.errors = err.error;
        } else {
          this.errorMessage = err.error?.message || 'Registration failed';
        }
      },
    });
  }

  getError(field: string) {
    const control = this.loginForm.get(field);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'This field is required';
    }
    if (this.errors[field]?.length) return this.errors[field][0];
    return null;
  }

}
