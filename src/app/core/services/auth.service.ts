import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'registered_users';

  constructor(private http: HttpClient) {
    // Initialiser le stockage avec un utilisateur par défaut si vide
    if (!localStorage.getItem(this.USERS_KEY)) {
      const defaultUsers: User[] = [
        {
          id: 1,
          name: "Test User",
          email: "test@example.com",
          password: "password123"
        }
      ];
      localStorage.setItem(this.USERS_KEY, JSON.stringify(defaultUsers));
    }
  }

  private getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return JSON.parse(users || '[]');
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  register(userData: any): Observable<any> {
    const users = this.getUsers();
    console.log('Utilisateurs existants:', users);

    // Vérifier si l'email existe déjà
    if (users.some(user => user.email === userData.email)) {
      return throwError(() => new Error('Cet email est déjà utilisé'));
    }

    // Créer un nouvel utilisateur
    const newUser: User = {
      id: users.length + 1,
      name: userData.name,
      email: userData.email,
      password: userData.password
    };

    // Ajouter l'utilisateur et sauvegarder
    users.push(newUser);
    this.saveUsers(users);

    console.log('Nouvel utilisateur enregistré:', newUser);
    console.log('Liste mise à jour des utilisateurs:', this.getUsers());

    return of({
      success: true,
      message: 'Inscription réussie'
    }).pipe(delay(500));
  }

  login(email: string, password: string): Observable<any> {
    const users = this.getUsers();
    console.log('Tentative de connexion pour:', email);
    console.log('Utilisateurs disponibles:', users);

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      console.log('Utilisateur trouvé:', user);
      const token = `mock-jwt-token-${Date.now()}`;
      
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email
      }));

      return of({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }).pipe(delay(500));
    }

    console.log('Aucun utilisateur trouvé avec ces identifiants');
    return throwError(() => new Error('Email ou mot de passe incorrect'));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Méthode de débogage
  debugUsers(): void {
    console.log('=== UTILISATEURS ENREGISTRÉS ===');
    console.log(this.getUsers());
    console.log('===============================');
  }


  forgotPassword(email: string): Observable<any> {
    const users = this.getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return throwError(() => new Error('Aucun compte n\'est associé à cette adresse email'));
    }

    // Générer un nouveau mot de passe temporaire
    const tempPassword = this.generateTemporaryPassword();
    
    // Mettre à jour le mot de passe de l'utilisateur
    const updatedUsers = users.map(u => {
      if (u.email === email) {
        return { ...u, password: tempPassword };
      }
      return u;
    });

    // Sauvegarder la mise à jour
    this.saveUsers(updatedUsers);

    // Simuler l'envoi d'email
    console.log('=== SIMULATION EMAIL ENVOYÉ ===');
    console.log('À:', email);
    console.log('Sujet: Réinitialisation de votre mot de passe');
    console.log('Message: Votre nouveau mot de passe temporaire est:', tempPassword);
    console.log('=============================');

    // Retourner une réponse simulée
    return of({
      success: true,
      message: 'Les instructions de réinitialisation ont été envoyées à votre adresse email'
    }).pipe(delay(1500)); // Simuler un délai réseau
  }

  private generateTemporaryPassword(): string {
    // Générer un mot de passe aléatoire de 8 caractères
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}