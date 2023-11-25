import { Component, Inject } from '@angular/core';
import { Mode } from 'src/app/core/model/theme-toggle-model';
import { MODE_STORAGE_SERVICE, ModeStorage } from 'src/app/core/modules/theme/service/theme-storage.service';
import { ThemeService } from 'src/app/core/modules/theme/service/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private themeService : ThemeService,
    @Inject(MODE_STORAGE_SERVICE) private modeStorage: ModeStorage){
    
  }
  Mode = Mode;
  currentTheme = this.modeStorage.get();
  toggleTheme() {
    this.themeService.toggleMode();
    this.themeService.modeChanged$.subscribe((value)=>{
      this.currentTheme = value;
    })
  }
}
