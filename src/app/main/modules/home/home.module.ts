import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './component/home-page/home-page.component';
import { NavbarComponent } from 'src/app/common/component/navbar/navbar.component';
import { SearchComponent } from "../../../common/component/search/search.component";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MovieCardComponent } from 'src/app/common/component/movie-card/movie-card.component';


@NgModule({
    declarations: [
        HomePageComponent,
        NavbarComponent,
       
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SearchComponent,
        MovieCardComponent,
        NgCircleProgressModule.forRoot(),
    ]
})
export class HomeModule { }
