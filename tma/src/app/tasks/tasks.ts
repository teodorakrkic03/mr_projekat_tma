import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
@Injectable({
  providedIn: 'root'
})
export class Tasks {
  private tasks: Task[] = [
    {
      id:'t1',
      title:'Zadatak 1',
      description: 'Ovo je opis zadatka 1',
      dueDate: new Date(2025,10,24),
      status: 'Not started',
      priority: 'Low',
      category: 'Project'
    },
    {
      id:'t2',
      title:'Zadatak 2',
      description: 'Ovo je opis zadatka 2',
      dueDate: new Date(2025,9,20),
      status: 'Active',
      priority: 'Medium',
      category: 'Maintenance'
    }
]

  getTasks(){
    return this.tasks;
  }

  getTask(taskId:string){
    return this.tasks.find(t => t.id === taskId);
  }
}
