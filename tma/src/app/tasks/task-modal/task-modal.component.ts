import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/app/categories-modal/category';
import { Category } from 'src/app/models/category.model';
import { Task } from 'src/app/models/task.model';
import { TasksService } from '../tasks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  standalone: false,
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent  implements OnInit {
  @Input() task?:Task;
  categories: Category[] = [];
  form! : FormGroup;
  errors: { [key:string]:string[]} = {};

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController, 
    private tasksService:TasksService, 
    private categoryService: CategoryService
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      due_date: [''],
      category_id: [null],
      status: ['Not started', Validators.required],
      priority: ['low', Validators.required],
    });
  }

  ngOnInit() {
    if (this.task) {
      this.form.patchValue({
        name: this.task.name,
        description: this.task.description,
        due_date: this.task.due_date,
        category_id: this.task.category?.id ?? null,
        status: this.task.status,
        priority: this.task.priority,
      });
    }

    this.categoryService.getCategories().subscribe((c) => {
      this.categories = c.data;
    })
  }

  saveTask() {
    this.errors = {};

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const taskData = this.form.value;

    if (this.task) {
      this.tasksService.updateTask(this.task.id, taskData).subscribe({
        next: (res) => this.modalCtrl.dismiss(res.task),
        error: (err) => {
          if (err.status === 422) {
          this.errors = err.error;
        } else {
          console.error('Update failed', err);
        }}
      });
    } else {
      this.tasksService.addTask(taskData).subscribe({
        next: (res) => this.modalCtrl.dismiss(res.task),
        error: (err) => {
          if (err.status === 422) {
          this.errors = err.error;
        } else {
          console.error('Add failed', err);
        }
        }
      });
    }
  }

  close(){
    this.modalCtrl.dismiss();
  }

  getError(field: string) {
    if (this.form.get(field)?.touched && this.form.get(field)?.errors) {
      const errors = this.form.get(field)?.errors!;
      if (errors['required']) return 'This field is required';
    }
    if (this.errors[field]?.length) return this.errors[field][0];
    return null;
  }

}
