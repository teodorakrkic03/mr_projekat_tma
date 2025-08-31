import { Component } from '@angular/core';
import { App } from './app';
import { ModalController } from '@ionic/angular';
import { CategoriesModalComponent } from './categories-modal/categories-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  
  constructor(private appService:App, private modalCtrl: ModalController) {}

  onLogout(){
    this.appService.handleLogout();
  }

  async openCategoriesModal() {
    const modal = await this.modalCtrl.create({
      component: CategoriesModalComponent
    });

    return await modal.present();
  }
}
