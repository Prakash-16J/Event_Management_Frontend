import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from '../model/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private baseUrl = 'http://localhost:8091/Vendors'; // Adjust the base URL according to your backend

  constructor(private http: HttpClient) {}

  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.baseUrl);
  }

  getVendorById(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.baseUrl}/${id}`);
  }

  createVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.baseUrl, vendor);
  }

  updateVendor(id: number, vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.baseUrl}/${id}`, vendor);
  }

  deleteVendor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getVendorsByCategory(category: string): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.baseUrl}/category/${category}`);
  }

  checkVendorAvailability(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${id}/availability`);
  }
}