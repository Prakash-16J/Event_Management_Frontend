import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../../service/guest.service';
import { Guest } from '../../model/guest.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css'
})
export class GuestComponent implements OnInit {
  guests: Guest[] = [];
  guest: Guest = { id: 0, name: '', email: '', phone: '', eventId: 0 }; // Initialize with default values
  eventId: number = 0; // To store the current event ID

  constructor(
    private guestService: GuestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the event ID from the route parameter
    const id = this.route.snapshot.paramMap.get('eventId');
    if (id) {
      this.eventId = +id;  // Convert the eventId from string to number
    }
  
    // If eventId is available, load the guests
    if (this.eventId > 0) {
      this.loadGuests();
    } else {
      console.error('Invalid event ID');
    }
  }
  

  loadGuests(): void {
    this.guestService.getGuestsByEvent(this.eventId).subscribe(
      guests => {
        this.guests = guests;
      },
      error => {
        console.error('Error loading guests:', error);
      }
    );
  }

  addGuest(): void {
    // Set the event ID for the new guest
    this.guest.eventId = this.eventId;
    
    this.guestService.addGuestToEvent(this.eventId.toString(), this.guest).subscribe(
      response => {
        alert(response); // Show success message
        this.guest = { id: 0, name: '', email: '', phone: '', eventId: 0 }; // Reset form
        this.loadGuests(); // Reload guests after adding
      },
      error => {
        console.error('Error adding guest:', error);
        alert('Failed to add guest. Please try again.'); // Show error message
      }
    );
  }
}