import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/interceptor/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./main/modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./main/modules/details/details.module').then(m => m.DetailsModule),
  },
  {
    path: 'search-full',
    loadChildren: () => import('./main/modules/search-list-pagination/search-list-pagination.module').then(m => m.SearchListPaginationModule),
  },
  {
    path: 'watchlist',
    loadChildren: () => import('./main/modules/watchlist/watchlist.module').then(m => m.WatchlistModule),
    canActivate: [AuthGuard], 
  },
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
