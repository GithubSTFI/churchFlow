import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';
  loading: boolean = false;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });

    // Vérifier si l'utilisateur vient de s'enregistrer
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.successMessage = 'Inscription réussie ! Veuillez vous connecter.';
        // Pré-remplir l'email si disponible
        if (params['email']) {
          this.loginForm.patchValue({
            email: params['email']
          });
        }
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';
      this.successMessage = '';
      
      const { email, password } = this.loginForm.value;
      
      console.log('Tentative de connexion avec:', { email }); // Pour le débogage

      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Connexion réussie:', response); // Pour le débogage
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('Erreur de connexion:', error); // Pour le débogage
          this.error = 'Email ou mot de passe incorrect';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  debugStorage(): void {
    console.log('=== DÉBUT DEBUG ===');
    console.log('Utilisateurs enregistrés:', localStorage.getItem('registered_users'));
    console.log('Token actuel:', localStorage.getItem('token'));
    console.log('Utilisateur actuel:', localStorage.getItem('currentUser'));
    console.log('=== FIN DEBUG ===');
    
    // Utiliser le service de débogage
    this.authService.debugUsers();
  }
}