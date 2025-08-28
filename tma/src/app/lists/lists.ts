import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class Lists {
  private lists: List[] = [
    {
      id:"l1",
      title:"Lista 1",
    },
    {
      id:"l2",
      title:"Lista 2",
    }
  ]

  getLists(){
    return this.lists;
  }

  getList(listId:string){
    return this.lists.find(l => l.id === listId);
  }
}
