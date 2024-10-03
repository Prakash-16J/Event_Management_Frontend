import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventCreateComponent } from '../event-create/event-create.component';
import { EventService } from '../../service/event.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { EventModel } from '../../model/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}


  openEventIdInput(): void {
    const eventId = prompt('Please enter the Event ID:');
    if (eventId) {
      this.router.navigate([`/event/${eventId}/guests`]);
    }
  }

}
