import { Component, HostBinding, HostListener, Inject } from '@angular/core';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { Mode } from 'src/app/core/model/theme-toggle-model';
import { MODE_STORAGE_SERVICE, ModeStorage } from 'src/app/core/modules/theme/service/theme-storage.service';
import { ThemeService } from 'src/app/core/modules/theme/service/theme.service';
import { ApiService } from 'src/app/main/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private themeService : ThemeService,
    private apiService: ApiService,
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
  
async openGoogleSignin() {
  try {
    const provider = new GoogleAuthProvider();
    console.log(provider);
    const auth = getAuth();
signInWithPopup(auth, provider)
.then((result) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
  
  const credential : any = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.idToken;
  // The signed-in user info.
  const user = result.user;
  const finalCredentials = { token};
  this.apiService.loginWithToken(finalCredentials).subscribe(
    response => {
      // Handle successful login response here
      console.log('Login successful:', response);
      // Redirect or perform other actions after successful login
    },
    error => {
      // Handle login error here or display an error message
      console.error('Login error:', error);
    }
  );

  // IdP data available using getAdditionalUserInfo(result)
  // ...
}).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.customData.email;
  // The AuthCredential type that was used.
  const credential = GoogleAuthProvider.credentialFromError(error);
  // ...
});
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
}
}
