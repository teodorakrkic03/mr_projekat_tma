import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  form: FormGroup;
  loading = true;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private profile: ProfileService, private alertCtrl: AlertController){
    this.form = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
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
    this.profile.updateMe(this.form.value).subscribe({
      next: () => {},
      error: (err) => this.errorMessage = err.error?.message || 'Failed to update profile'
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
}


