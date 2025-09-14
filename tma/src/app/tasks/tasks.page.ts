import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks';
import { Task } from '../models/task.model';
import { ModalController } from '@ionic/angular';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskFilterModalComponent } from './task-filter-modal/task-filter-modal.component';
@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
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
        this.filteredTasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load tasks';
        this.loading = false;
      }
    });
  }

  handleSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredTasks = this.tasks.filter(task =>
      task.name.toLowerCase().includes(query) ||
      (task.description && task.description.toLowerCase().includes(query))
    );
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
        this.filteredTasks = [...this.tasks];
      }
    });

    await modal.present();
  }

  async openFilterModal() {
    const modal = await this.modalCtrl.create({
      component: TaskFilterModalComponent
    })

    modal.onDidDismiss().then(({ data }) => {
      if(data){
        this.applyFilters(data);
      }
    });

    await modal.present();
  }

  applyFilters(filters:any){
    this.loading = true;
    this.tasksService.filterTasks(filters).subscribe({
      next: (tasks) => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
      this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to filter tasks';
        this.loading = false;
      }
    });
  }

}
