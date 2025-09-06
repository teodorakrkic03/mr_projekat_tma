import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListsPageRoutingModule } from './lists-routing.module';

import { ListsPage } from './lists.page';
import { ListItemComponent } from './list-item/list-item.component';
import { ListModalComponent } from './list-modal/list-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListsPageRoutingModule
  ],
  declarations: [ListsPage, ListItemComponent, ListModalComponent]
})
export class ListsPageModule {}
