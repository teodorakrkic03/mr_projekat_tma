import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tasks } from '../tasks';
import { Task } from '../../models/task.model';

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
    private tasksService: Tasks,
    private router: Router
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

}
