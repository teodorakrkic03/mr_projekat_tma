import { Component, OnInit } from '@angular/core';
import { Tasks } from './tasks';
import { Task } from '../models/task.model';
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

  constructor(private tasksService:Tasks) { }

  ngOnInit() {
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

}
