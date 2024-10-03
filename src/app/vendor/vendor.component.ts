import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Vendor } from '../model/vendor.model';
import { VendorService } from '../service/vendor.service';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent implements OnInit{

  vendors: Vendor[] = [];
  vendor: Vendor = { id: 0, name: '', available: false, serviceType: '', contactInfo: '', rating: 0 };

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.vendorService.getAllVendors().subscribe(data => {
      this.vendors = data;
    });
  }

  createVendor(): void {
    this.vendorService.createVendor(this.vendor).subscribe(newVendor => {
      this.vendors.push(newVendor);
      this.resetForm();
    });
  }

  updateVendor(): void {
    this.vendorService.updateVendor(this.vendor.id, this.vendor).subscribe(updatedVendor => {
      const index = this.vendors.findIndex(v => v.id === updatedVendor.id);
      this.vendors[index] = updatedVendor;
      this.resetForm();
    });
  }

  deleteVendor(id: number): void {
    this.vendorService.deleteVendor(id).subscribe(() => {
      this.vendors = this.vendors.filter(v => v.id !== id);
    });
  }

  resetForm(): void {
    this.vendor = { id: 0, name: '', available: false, serviceType: '', contactInfo: '', rating: 0 };
  }
}
