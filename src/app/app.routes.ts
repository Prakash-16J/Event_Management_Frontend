import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EventComponent } from './components/event/event.component';
import { VendorComponent } from './vendor/vendor.component';
import { BudgetComponent } from './components/budget/budget.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { GuestComponent } from './components/guest/guest.component';


export const routes: Routes =  [
    { path: '', component: HomeComponent }, // This will handle listing, creating, and editing
    { path: 'event', component: EventComponent }, // This will also handle editing by ID
    { path: 'vendors', component: VendorComponent },
    { path: 'budgets', component: BudgetComponent },
    { path: 'event-create', component: EventCreateComponent},
    { path: 'event-create/:id', component: EventCreateComponent},
    { path: 'event/:eventId/guests', component: GuestComponent }
   


  ];


  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}