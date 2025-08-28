import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tasks } from '../tasks';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-details',
  standalone: false,
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {
  loadedTask: Task | undefined;

  constructor(private activatedRoute: ActivatedRoute, private tasksService:Tasks) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('taskId')){
        //redirect
        return;
      }
      const taskId = paramMap.get('taskId');
      this.loadedTask = this.tasksService.getTask(taskId as string);
    });
  }

}
