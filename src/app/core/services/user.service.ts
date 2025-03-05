// src/app/core/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'your-api-url'; // À remplacer par votre URL d'API

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/me`);
  }

  updateProfile(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/profile`, userData);
  }
}