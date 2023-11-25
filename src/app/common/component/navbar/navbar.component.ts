import { Component, HostBinding, HostListener, Inject } from '@angular/core';
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
 
  fullSearchBar = false;
  toggleFullSearchBar = false;
  Mode = Mode;
  currentTheme = this.modeStorage.get();
  toggleTheme() {
    this.themeService.toggleMode();
    this.themeService.modeChanged$.subscribe((value : Mode)=>{
      this.currentTheme = value;
    })
  }

  toggleFullSerchBar(){
    this.toggleFullSearchBar = !this.toggleFullSearchBar
  }

  @HostListener('window:resize', ['$event'])
onResize(event : any) {
  console.log(event.target.innerWidth);
  this.fullSearchBar  = (event.target.innerWidth < 640);
  console.log(event.target.innerWidth , this.fullSearchBar);
}
  
}
