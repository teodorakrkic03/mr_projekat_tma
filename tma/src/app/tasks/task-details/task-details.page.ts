import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../tasks';
import { Task } from '../../models/task.model';
import { ModalController } from '@ionic/angular';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task-details',
  standalone: false,
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {
  loadedTask: Task | undefined;
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private tasksService: TasksService,
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const taskId = paramMap.get('taskId');
      if (!taskId) {
        this.router.navigate(['/tasks']);
        return;
      }

      this.loading = true;
      this.tasksService.getTask(taskId).subscribe({
        next: (task) => {
          this.loadedTask = task;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Task not found';
          this.loading = false;
        }
      });
    });
  }

  async openTaskModal(task?:Task){
      const modal = await this.modalCtrl.create({
        component: TaskModalComponent,
        componentProps:{ task }
      });

      modal.onDidDismiss().then(({ data }) => {
        if(data){
          this.loadedTask = data;
        }
      });
  
      await modal.present();
  }

  onDelete(taskId?:number){
    if(!taskId) return;
    this.tasksService.deleteTask(taskId).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: (err) => console.error('Delete failed', err)
    });
  }

}
