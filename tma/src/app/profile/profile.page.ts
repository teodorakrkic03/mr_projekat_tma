import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: false
})
export class ProfilePage implements OnInit {
  form: FormGroup;
  loading = true;
  isSubmitting = false;
  errorMessage: string | null = null;
  errors: { [key: string]: string[] } = {}

  constructor(private fb: FormBuilder, private profile: ProfileService, private alertCtrl: AlertController){
    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]],
      last_name: ['', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(){
    this.load();
  }

  load(){
    this.loading = true;
    this.profile.getMe().subscribe({
      next: (user) => {
        this.form.patchValue(user);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load profile';
        this.loading = false;
      }
    })
  }

  save(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    this.errors = {};

    this.profile.updateMe(this.form.value).subscribe({
      next: () => {this.isSubmitting = false;},
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 422 && err.error) {
          this.errors = err.error;
        } else {
          this.errorMessage = err.error?.message || 'Failed to update profile';
        }
      }
    })
  }

  async delete(){
    const confirm = await this.alertCtrl.create({
      header: 'Delete account?',
      message: 'This action cannot be undone.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Delete', role: 'destructive', handler: () => this.doDelete() }
      ]
    });
    await confirm.present();
  }

  private doDelete(){
    this.profile.deleteMe().subscribe({
      next: () => { window.location.href = '/login'; },
      error: (err) => this.errorMessage = err.error?.message || 'Failed to delete account'
    })
  }

  getError(field: string) {
    const control = this.form.get(field);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'This field is required';
      if (control.errors['pattern']) return 'Invalid format';
      if (control.errors['email']) return 'Invalid email';
    }
    if (this.errors[field]?.length) return this.errors[field][0];
    return null;
  }

}


