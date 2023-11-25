import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./main/modules/home/home.module').then(m => m.HomeModule)
  },
  // {
  //   path: 'detail',
  //   loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  // },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
