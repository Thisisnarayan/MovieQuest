import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './service/theme.service';
import { MODE_STORAGE_SERVICE, ThemeStorageService } from './service/theme-storage.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ThemeService,
    {
      provide: MODE_STORAGE_SERVICE,
      useClass: ThemeStorageService,
    },
  ]
})
export class ThemeModule { }
