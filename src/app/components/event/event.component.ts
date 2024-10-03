import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventModel } from '../../model/event.model';
import { EventService } from '../../service/event.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,RouterLink],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: EventModel[] = [];
  event: EventModel = { name: '', date: '', location: '' };
  isEdit: boolean = false;
  selectedEventId: number | null = null;

 
  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadEvents();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.selectedEventId = +id;
      this.eventService.getEventById(this.selectedEventId).subscribe((data: EventModel) => {
        this.event = data;
      });
    }
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe((data: EventModel[]) => {
      this.events = data;
    });
  }

  // createEvent(): void {
  //   this.eventService.createEvent(this.event).subscribe(() => {
  //     this.loadEvents();
  //     this.resetForm();
  //   });
  // }

editEvent(evt: EventModel): void {
  this.isEdit = true;
  if (evt.id) {
    this.selectedEventId = evt.id;
    this.event = evt;
  }
}


  updateEvent(): void {
    if (this.selectedEventId) {
      this.eventService.updateEvent(this.selectedEventId, this.event).subscribe(() => {
        this.loadEvents();
        this.resetForm();
      });
    }
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents();
    });
  }

  resetForm(): void {
    this.event = { name: '', date: '', location: '' };
    this.isEdit = false;
    this.selectedEventId = null;
  }
}