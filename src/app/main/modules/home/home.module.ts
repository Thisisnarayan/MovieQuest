import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './component/home-page/home-page.component';
import { NavbarComponent } from 'src/app/common/component/navbar/navbar.component';


@NgModule({
  declarations: [
    HomePageComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
