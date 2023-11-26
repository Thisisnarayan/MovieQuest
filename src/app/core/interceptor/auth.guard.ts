import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check the authentication status or any other condition
    if (this.authService.isLoggedIn()) {
      // If authenticated, allow access to the route
      return true;
    } else {
      // If not authenticated, redirect to the login page or another route
      this.router.navigate(['/home']);
      return false;
    }
  }
}