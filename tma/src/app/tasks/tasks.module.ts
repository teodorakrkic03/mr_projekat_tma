import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksPageRoutingModule } from './tasks-routing.module';

import { TasksPage } from './tasks.page';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskFilterModalComponent } from './task-filter-modal/task-filter-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TasksPage, TaskItemComponent,TaskModalComponent,TaskFilterModalComponent]
})
export class TasksPageModule {}
