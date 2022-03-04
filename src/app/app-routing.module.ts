import { AuthGuard } from './authentication/guard/auth.guard';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    // Example for LazyLoading mode, thats help to better performance of Angular. Its one of Best Pratices Angular
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  // {
  //   path:'',
  //   redirectTo:'login',
  //   pathMatch:'full'
  // },
  {
    path: 'login',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate:[AuthGuard]
  },
  /**
   * Any Broken Routes redirect to login component
   */
  {
    path:'**',
    redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
