import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeModule } from './core/modules/theme/theme.module';
import { NavbarComponent } from './common/component/navbar/navbar.component';
import { MovieCardComponent } from './common/component/movie-card/movie-card.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThemeModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
