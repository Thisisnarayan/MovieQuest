import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeModule } from './core/modules/theme/theme.module';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { environment } from 'src/environments/environment.prod';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NetworkInterceptor } from './core/interceptor/network.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThemeModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    // Initialize Firebase in the constructor or wherever appropriate
    
    const app = initializeApp(environment.firebaseConfig);
     getAnalytics(app);
  }
}
