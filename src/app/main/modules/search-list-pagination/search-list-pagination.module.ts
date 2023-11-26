import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchListPaginationRoutingModule } from './search-list-pagination-routing.module';
import { MoviePaginationComponent } from './movie-pagination/movie-pagination.component';
import { FullResultComponent } from './full-result/full-result.component';
import { MovieCardComponent } from 'src/app/common/component/movie-card/movie-card.component';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  declarations: [
    FullResultComponent,
    MoviePaginationComponent
  ],
  imports: [
    CommonModule,
    MovieCardComponent,
    NgCircleProgressModule.forRoot(),
    SearchListPaginationRoutingModule
  ]
})
export class SearchListPaginationModule { 

}
