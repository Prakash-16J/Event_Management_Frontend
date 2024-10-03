import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guest } from '../model/guest.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private apiUrl = 'http://localhost:8080/events'; // Update the base URL to match your backend

  constructor(private http: HttpClient) {}

  
  addGuestToEvent(eventId: string, guest: Guest): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${this.apiUrl}/${eventId}/guests`, guest, { headers });
  }

  getGuestsByEvent(eventId: number): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.apiUrl}/${eventId}/guests`);
  }
}

// {
  // headers: new HttpHeaders({
  //   'Content-Type': 'application/json'
  // })
