import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/app/categories-modal/category';
import { Category } from 'src/app/models/category.model';
import { Task } from 'src/app/models/task.model';
import { TasksService } from '../tasks';

@Component({
  selector: 'app-task-modal',
  standalone: false,
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent  implements OnInit {
  @Input() task?:Task;
  categories: Category[] = [];

  form = {
    name:'',
    description:'',
    due_date:'',
    category_id: null as number | null,
    status: 'Not started',
    priority: 'low'
  }

  constructor(
    private modalCtrl: ModalController, 
    private tasksService:TasksService, 
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    if(this.task){
      this.form = {
        name: this.task.name,
        description: this.task.description as string,
        due_date: this.task.due_date as string,
        category_id: this.task.category?.id ?? null,
        status: this.task.status,
        priority: this.task.priority
      }
    }

    this.categoryService.getCategories().subscribe((c) => {
      this.categories = c.data;
    })
  }

  saveTask() {
    const taskData: Partial<Task>  & { category_id?: number | null } = {
      name: this.form.name,
      description: this.form.description,
      due_date: this.form.due_date,
      category_id: this.form.category_id ?? null,
      status: this.form.status as "Not started" | "Active" | "Finished",
      priority: this.form.priority as "low" | "medium" | "high",
    };


    if(this.task){
      this.tasksService.updateTask(this.task.id, taskData).subscribe({
        next: (res) => this.modalCtrl.dismiss(res.task),
        error: (err) => console.error('Update failed', err),
      });
    }else{
      this.tasksService.addTask(taskData).subscribe({
        next: (res) => this.modalCtrl.dismiss(res.task),
        error: (err) => console.error('Add failed', err),
      })
    }
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
