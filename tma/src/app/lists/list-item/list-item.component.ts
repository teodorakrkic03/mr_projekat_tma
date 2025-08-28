import { Component, Input, OnInit } from '@angular/core';
import { List } from '../../models/list.model';
import { ListOrder } from 'src/app/models/list-order.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-list-item',
  standalone: false,
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent  implements OnInit {
  @Input() listItem!: List;
  @Input() tasks!: Task[];
  @Input() listOrder!: ListOrder[];

  orderedTasks: Task[] = [];
  constructor() { }

  ngOnInit() {
    const orders = this.listOrder
      .filter(o => o.listId === this.listItem.id)
      .sort((a, b) => a.order - b.order);

    this.orderedTasks = orders
      .map(o => this.tasks.find(t => t.id === o.taskId)!)
      .filter(Boolean);
  }

}
