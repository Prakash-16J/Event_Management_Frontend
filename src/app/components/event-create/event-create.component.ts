import { Component,OnInit } from '@angular/core';
import { EventService } from '../../service/event.service';
import { EventModel } from '../../model/event.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css'
})
export class EventCreateComponent implements OnInit{
  
  event: EventModel = { name: '', date: '', location: '' };
  successMessage: string = ''; // Property to hold the success message
  errorMessage: string = ''; // Optional property for error messages


  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) {}


  ngOnInit() {
    // Check if there is an ID in the route parameters
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      // Fetch the event details by ID if editing
      const id = Number(eventId);
      this.eventService.getEventById(id).subscribe((event) => {
        this.event = event; // Set the event details for editing
      });
    }
  }

  createEvent() {
    if (this.event.id) {
      // Call the update function if editing
      this.eventService.updateEvent(this.event.id, this.event).subscribe(
        (response) => {
          this.successMessage = 'Event updated successfully!';
          this.event = { name: '', date: '', location: '' }; // Clear the form fields after submission
          this.router.navigate(['/event']); // Optionally navigate back to the event list
        },
        (error) => {
          this.errorMessage = 'Failed to update event. Please try again.';
          console.error('Error updating event:', error);
        }
      );
    } else {
      // Call the create function if creating
      this.eventService.createEvent(this.event).subscribe(
        (response) => {
          this.successMessage = 'Event created successfully!';
          this.event = { name: '', date: '', location: '' }; // Clear the form fields after submission
        },
        (error) => {
          this.errorMessage = 'Failed to create event. Please try again.';
          console.error('Error creating event:', error);
        }
      );
    }
  }
}