// src/app/core/services/events.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = 'your-api-url'; // À remplacer par votre URL d'API

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/events`);
  }

  getEventById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/events/${id}`);
  }

  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/events`, eventData);
  }

  updateEvent(id: number, eventData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/events/${id}`, eventData);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/events/${id}`);
  }
}