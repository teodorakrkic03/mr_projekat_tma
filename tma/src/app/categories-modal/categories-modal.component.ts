import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { ModalController } from '@ionic/angular';
import { CategoryService } from './category';

@Component({
  selector: 'app-categories-modal',
  standalone: false,
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.scss'],
})
export class CategoriesModalComponent  implements OnInit {
  categories:Category[] = [];
  newCategoryName:string = '';

  constructor(private modalCtrl: ModalController, private categoryService:CategoryService) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.error("Failed to load categories", err);
      }
    })
  }

  addCategory(){
    if(!this.newCategoryName.trim()) return;
    this.categoryService.addCategory(this.newCategoryName).subscribe({
      next: (res) => {
        console.log('Dodato:', res);
        this.categories.push(res.category);
        this.newCategoryName='';
      },
      error: (err) => {
        console.error('Failed to add category',err);
      }
    })
  }

  deleteCategory(id:number){
    this.categoryService.deleteCategory(id).subscribe(()=>{
      this.categories = this.categories.filter(c => c.id !== id);
    })
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
