import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor( 
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]],
      last_name: ['', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const { first_name, last_name, email, username, password } = this.registerForm.value;

    this.auth.register(first_name, last_name, username, email, password).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    });
  }

}
