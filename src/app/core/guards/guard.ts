// src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard - Current route:', state.url);
    console.log('AuthGuard - Auth status:', this.authService.isAuthenticated());

    // Pour les routes admin
    if (state.url.startsWith('/admin')) {
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }

    // Pour les routes auth (login, register, forgot-password)
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/dashboard']);
      return false;
    }

    return true;
  }
}