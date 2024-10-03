import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from '../model/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

 
  private baseUrl = 'http://localhost:8080/budgets'; // Adjust the port accordingly

  constructor(private http: HttpClient) {}

  createBudget(eventId: number, totalAmount: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}`, { eventId, totalAmount });
  }

  getBudgetByEventId(eventId: number): Observable<Budget> {
    return this.http.get<Budget>(`${this.baseUrl}/${eventId}`);
  }

  addCost(eventId: number, cost: number): Observable<Budget> {
    return this.http.post<Budget>(`${this.baseUrl}/${eventId}/addCost`, { cost });
  }

  getTotalSpent(eventId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${eventId}/totalSpent`);
  }

  updateBudget(eventId: number, totalAmount: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${eventId}`, totalAmount);
  }

  deleteBudget(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${eventId}`);
  }
}
