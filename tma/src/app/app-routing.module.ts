import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
  
  {
    path:'',
    children: [
        {
          path: 'login',
          loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
        },
        {
          path: 'register',
          loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
        },
    ]
  },
  {
    path:'',
    component: TabsPage,
    children:[
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
        path: 'lists',
        loadChildren: () => import('./lists/lists.module').then( m => m.ListsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
