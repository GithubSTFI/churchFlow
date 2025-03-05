// src/app/core/services/members.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private apiUrl = 'your-api-url'; // À remplacer par votre URL d'API

  constructor(private http: HttpClient) { }

  getAllMembers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/members`);
  }

  getMemberById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/members/${id}`);
  }

  createMember(memberData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/members`, memberData);
  }

  updateMember(id: number, memberData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/members/${id}`, memberData);
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/members/${id}`);
  }
}