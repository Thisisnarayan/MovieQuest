import { Component, HostBinding, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { Mode } from 'src/app/core/model/theme-toggle-model';
import {
  MODE_STORAGE_SERVICE,
  ModeStorage,
} from 'src/app/core/modules/theme/service/theme-storage.service';
import { ThemeService } from 'src/app/core/modules/theme/service/theme.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/main/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    @Inject(MODE_STORAGE_SERVICE) private modeStorage: ModeStorage
  ) {}

  ngOnInit(): void {
      this.checkSessionWithServer();
  }
  user : any = null;
  fullSearchBar = false;
  toggleFullSearchBar = false;
  Mode = Mode;
  currentTheme = this.modeStorage.get();
  toggleTheme() {
    this.themeService.toggleMode();
    this.themeService.modeChanged$.subscribe((value: Mode) => {
      this.currentTheme = value;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(event.target.innerWidth);
    this.fullSearchBar = event.target.innerWidth < 640;
    console.log(event.target.innerWidth, this.fullSearchBar);
  }

  async openGoogleSignin() {
    try {
      const provider = new GoogleAuthProvider();
      console.log(provider);
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.

          const credential: any =
            GoogleAuthProvider.credentialFromResult(result);
          const token = await result.user.getIdToken();

          // The signed-in user info.
          this.user = result.user;
          const finalCredentials = { token };
          this.apiService.loginWithToken(finalCredentials).subscribe(
            (response) => {
              // Handle successful login response here
              console.log('Login :', response);
              if ((response.status = 'success')) {
                this.authService.setLoggedIn(true);
                this.authService.savetoken(response.token);
              } else {
                this.authService.setLoggedIn(false);
              }
              // Redirect or perform other actions after successful login
            },
            (error) => {
              // Handle login error here or display an error message
              console.error('Login error:', error);
            }
          );

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
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

  checkSessionWithServer() {
    
    const token = this.authService.getToken();
    if(token == null || token == undefined) {
      this.authService.setLoggedIn(false);
      return;
    }
    this.apiService.checkSession(token!).subscribe(( res : any)=>{
      this.user = res.data.user;
      this.user.photoURL = res.data.user.picture;
    },(err)=>{
      
    })
  }
  gotoHome() {
    this.router.navigateByUrl("/home");
  }
  logOut(){
    localStorage.clear();
    this.user = null;
  }
}
