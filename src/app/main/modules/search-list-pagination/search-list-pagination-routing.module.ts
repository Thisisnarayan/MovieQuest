import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullResultComponent } from './full-result/full-result.component';

const routes: Routes = [
  {
    path: '',
    component: FullResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchListPaginationRoutingModule { }
