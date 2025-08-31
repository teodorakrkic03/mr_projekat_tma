import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks';
import { Task } from '../models/task.model';
import { ModalController } from '@ionic/angular';
import { TaskModalComponent } from './task-modal/task-modal.component';
@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks: Task[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private tasksService:TasksService, private modalCtrl:ModalController) { }

  ngOnInit() {
    this.fetchTasks();
  }

  ionViewWillEnter(){
    this.fetchTasks();
  }

  fetchTasks() {
    this.loading = true;
    this.tasksService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load tasks';
        this.loading = false;
      }
    });
  }

  async openTaskModal(task?:Task){
    const modal = await this.modalCtrl.create({
      component: TaskModalComponent,
      componentProps:{ task }
    });

    modal.onDidDismiss().then(({ data }) => {
      if(data){
        if(task){
          const index = this.tasks.findIndex(t => t.id === task.id);
          if (index > -1) this.tasks[index] = data;
        } else{
          this.tasks.push(data);
        }
      }
    });

    await modal.present();
  }

}
