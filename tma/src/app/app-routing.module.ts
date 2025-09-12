import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { TabsPage } from './tabs/tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
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
    canActivate: [AuthGuard],
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
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'lists',
        children: [
          {
            path: '',
            loadChildren: () => import('./lists/lists.module').then( m => m.ListsPageModule)
          },
          {
            path: ':listId',
            loadChildren: () => import('./lists/list-details/list-details.module').then( m => m.ListDetailsPageModule)
          }
        ]
        
      }
    ]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
