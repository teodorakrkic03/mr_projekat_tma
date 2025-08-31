import { Component, OnInit } from '@angular/core';
import { List } from '../models/list.model';
import { Lists } from './lists';

@Component({
  selector: 'app-lists',
  standalone: false,
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {
  lists: List[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private listsService: Lists) { }

  ngOnInit() {
    this.fetchLists();
  }

  fetchLists() {
    this.loading = true;
    this.listsService.getLists().subscribe({
      next: (lists) => {
        console.log('API response:', lists);
        this.lists = lists.task_lists;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load lists';
        this.loading = false;
      }
    });
  }

}
