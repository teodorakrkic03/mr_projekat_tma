import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tasks',
    children: [
      {
        path: '',
        loadChildren: () => import('./tasks/tasks.module').then( m => m.TasksPageModule)
      },
      {
        path: ':taskId',
        loadChildren: () => import('./tasks/task-details/task-details.module').then( m => m.TaskDetailsPageModule)
      }
    ]
    
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'lists',
    loadChildren: () => import('./lists/lists.module').then( m => m.ListsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
