import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/app/categories-modal/category';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-task-filter-modal',
  templateUrl: './task-filter-modal.component.html',
  styleUrls: ['./task-filter-modal.component.scss'],
  standalone: false
})
export class TaskFilterModalComponent  implements OnInit {
  filters: any = {};
  categories: Category[] = [];

  constructor(private modalCtrl: ModalController, private categoriesService: CategoryService ) {}

  ngOnInit(){
    this.categoriesService.getCategories().subscribe(cats => {
      this.categories = cats.data;
    })
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  apply() {
    this.modalCtrl.dismiss(this.filters);
  }

  clear(){
    this.filters = {};
    this.modalCtrl.dismiss(this.filters);
  }

}
