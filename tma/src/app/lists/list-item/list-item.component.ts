import { Component, Input, OnInit } from '@angular/core';
import { List } from '../../models/list.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-list-item',
  standalone: false,
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent  implements OnInit {
  @Input() listItem!: List;
  orderedTasks: Task[] = [];

  constructor() { }

  ngOnInit() {
    if (this.listItem.tasks) {
      this.orderedTasks = this.listItem.tasks
        .sort((a, b) => a.num - b.num) // sortiramo po redosledu
        .map(o => o.task); // izvučemo pravi task iz resource polja
    }
  }

}
