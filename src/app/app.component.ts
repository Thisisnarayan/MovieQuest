import { Component, OnInit } from '@angular/core';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { ApiService } from './main/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private apiService: ApiService) {
   
    
  }
  ngOnInit() {
    
  }

 
}
