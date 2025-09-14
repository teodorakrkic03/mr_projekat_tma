import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { List, TaskInList } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { ListsService } from '../lists';
import { TasksService } from 'src/app/tasks/tasks';

@Component({
  selector: 'app-list-modal',
  standalone: false,
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss'],
})
export class ListModalComponent  implements OnInit {
  @Input() list?: List;

  form = {
    name: '',
    tasks: [] as TaskInList[]
  }

  allTasks: Task[] = [];
  nameError: string | null = null;

  constructor(
    private modalCtrl: ModalController,
    private listsService: ListsService,
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    if(this.list){
      this.form = {
        name: this.list.name,
        tasks: [...this.list.tasks]
      };
    }

    this.tasksService.getTasks().subscribe((tasks) => {
      this.allTasks = tasks;
    })
  }

  saveList(){
    if (!this.form.name.trim()) {
      this.nameError = 'Name is required';
      return;
    } else {
      this.nameError = null;
    }

    if (this.list) {
      this.listsService.updateList(this.list.id, { name: this.form.name }).subscribe({
        next: (res) => {
          this.modalCtrl.dismiss(res.task_list);
        }
      });
    } else {
      this.listsService.createList(this.form.name).subscribe({
        next: (res) => {
          this.modalCtrl.dismiss(res.task_list);
        }
      });
    }
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  addTaskToList(task: Task) {
    if (!this.list) return;
    this.listsService.addTaskToList(this.list.id, task.id).subscribe({
      next: () => {
        this.form.tasks.push({
          task_list_id: this.list!.id,
          task_id: task.id,
          num: this.form.tasks.length + 1,
          task
        });
      }
    });
  }

  removeTaskFromList(taskId: number) {
    if (!this.list) return;
    this.listsService.removeTaskFromList(this.list.id, taskId).subscribe({
      next: () => {
        this.form.tasks = this.form.tasks.filter(t => t.task_id !== taskId);
        this.form.tasks = this.form.tasks.map((t,index) => ({
          ...t,
          num: index+1
        }));
      }
    });
  }

}
