// src/app/core/services/events.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Event } from '../../features/events/models/event.model';

export interface EventStats {
  title: string;
  count: number;
  increase: number;
  color: string;
  textColor: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private dataUrl = 'assets/data/events.json';

  constructor(private http: HttpClient) {}

  getEventStats(): Observable<EventStats[]> {
    return this.http.get<any>(this.dataUrl).pipe(
      map(data => Object.values(data.stats))
    );
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<any>(this.dataUrl).pipe(
      map(data => data.events)
    );
  }

  getEventsByType(type: string): Observable<Event[]> {
    return this.getEvents().pipe(
      map(events => events.filter(event => event.type === type))
    );
  }

  getEventById(id: number): Observable<Event | undefined> {
    return this.getEvents().pipe(
      map(events => events.find(event => event.id === id))
    );
  }
}