import { Component, OnInit } from '@angular/core';
import { Tasks } from './tasks';
import { Task } from './task.model';
@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks: Task[] = [];

  constructor(private tasksService:Tasks) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
  }

}
