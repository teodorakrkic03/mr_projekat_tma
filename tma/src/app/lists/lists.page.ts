import { Component, OnInit } from '@angular/core';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';
import { Lists } from './lists';
import { Tasks } from '../tasks/tasks';
import { ListOrder } from '../models/list-order.model';

@Component({
  selector: 'app-lists',
  standalone: false,
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {
  lists: List[] = [];
  tasks: Task[] = [];
  listOrder: ListOrder[] = [
    {
      listId:'l1',
      taskId:'t1',
      order:1
    },
    {
      listId:'l1',
      taskId:'t2',
      order:2
    },
    {
      listId:'l2',
      taskId:'t2',
      order:1
    },
  ];

  constructor(private listsService:Lists, private tasksService:Tasks) { }

  ngOnInit() {
    this.lists = this.listsService.getLists();
    this.tasks = this.tasksService.getTasks();
  }

}
