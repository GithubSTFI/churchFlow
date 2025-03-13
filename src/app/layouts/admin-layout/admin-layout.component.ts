import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  // Les éléments de menu sont maintenant directement dans le template HTML
  // pour correspondre à la structure de l'image

  // Propriété pour suivre l'état de la barre latérale
  sidenavCollapsed = false;
  isMobile = false;
  currentUser: any = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.checkScreenSize();
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.authService.currentUser$.subscribe(
      user => {
        this.currentUser = user;
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    // Auto-collapse sidenav on mobile
    if (this.isMobile) {
      this.sidenavCollapsed = true;
    }
  }

  // Méthode pour basculer l'état de la barre latérale
  toggleSidenav() {
    this.sidenavCollapsed = !this.sidenavCollapsed;
  }
}
