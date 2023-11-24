import { Component } from '@angular/core';
import { Mode } from 'src/app/core/model/theme-toggle-model';
import { ThemeService } from 'src/app/core/modules/theme/service/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private themeService : ThemeService){
    
  }

  toggleTheme() {
    this.themeService.toggleMode();
  }
}
