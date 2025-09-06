import { Component, OnInit } from '@angular/core';
import { List } from '../models/list.model';
import { ListsService } from './lists';
import { ModalController } from '@ionic/angular';
import { ListModalComponent } from './list-modal/list-modal.component';

@Component({
  selector: 'app-lists',
  standalone: false,
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {
  lists: List[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private listsService: ListsService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.fetchLists();
  }

  ionViewWillEnter(){
    this.fetchLists();
  }

  fetchLists() {
    this.loading = true;
    this.listsService.getLists().subscribe({
      next: (lists) => {
        this.lists = lists.task_lists;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load lists';
        this.loading = false;
      }
    });
  }

  async openListModal() {
    const modal = await this.modalCtrl.create({
      component: ListModalComponent
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data) {
        this.lists.push(data);
      }
    });

    await modal.present();
  }

}
