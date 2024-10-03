import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventModel } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.apiUrl}/${id}`);
  }

  createEvent(event: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(this.apiUrl, event);
  }

  updateEvent(id: number, event: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(`${this.apiUrl}/update/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}