import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { ListsService } from '../lists';
import { AlertController, ModalController } from '@ionic/angular';
import { ListModalComponent } from '../list-modal/list-modal.component';

@Component({
  selector: 'app-list-details',
  standalone: false,
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  loadedList: List | undefined;
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private listsService: ListsService,
    private router: Router,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const listId = paramMap.get('listId');
      if (!listId) {
        this.router.navigate(['/lists']);
        return;
      }

      this.loading = true;
      this.listsService.getList(listId).subscribe({
        next: (list) => {
          this.loadedList = {
            ...list,
            tasks: list.tasks ?? []
          };
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'List not found';
          this.loading = false;
        }
      });
    });
  }

  async openListModal(list?: List) {
    const modal = await this.modalCtrl.create({
      component: ListModalComponent,
      componentProps: { list }
    });

    modal.onDidDismiss().then(({ data }) => {
      if(data){
        if(list){
          this.loadedList = data;
        }
      }else{
        this.router.navigate(['/lists']);
      }
    });
    await modal.present();
  }

  async onDeleteList(){
    if (!this.loadedList) return;

    const alert = await this.alertCtrl.create({
      header: 'Confirm delete',
      message: 'Are you sure you want to delete this list?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: () => {
            this.listsService.deleteList(this.loadedList!.id).subscribe({
              next: () => {
                this.router.navigate(['/lists']);
              },
              error: (err) => console.error(err)
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
