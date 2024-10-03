import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Budget } from '../../model/budget.model';
import { BudgetService } from '../../service/budget.service';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent implements OnInit {
  
  eventId: number = 0;
  totalAmount: number = 0;
  budget: Budget | null = null;

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    // Initialize with a default event ID or handle event selection
    this.eventId = 1; // Example; you can replace this with actual event selection
  }

  createBudget(): void {
    this.budgetService.createBudget(this.eventId, this.totalAmount).subscribe(response => {
      console.log(response);
      this.loadBudget();
    });
  }

  loadBudget(): void {
    this.budgetService.getBudgetByEventId(this.eventId).subscribe(budget => {
      this.budget = budget;
    });
  }

  addCost(cost: number): void {
    this.budgetService.addCost(this.eventId, cost).subscribe(updatedBudget => {
      this.budget = updatedBudget;
    });
  }

  getTotalSpent(): void {
    this.budgetService.getTotalSpent(this.eventId).subscribe(totalSpent => {
      console.log('Total Spent:', totalSpent);
    });
  }

  updateBudget(): void {
    this.budgetService.updateBudget(this.eventId, this.totalAmount).subscribe(() => {
      console.log('Budget updated');
    });
  }

  deleteBudget(): void {
    this.budgetService.deleteBudget(this.eventId).subscribe(() => {
      console.log('Budget deleted');
      this.budget = null;
    });
  }
}