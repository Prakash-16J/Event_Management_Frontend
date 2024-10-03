export interface EventModel {
    id?: number;         // Optional because it will be generated on the backend
    name: string;
    date: string;       // You can use Date type if you're handling date conversion
    location: string;
    // Add additional fields if needed (e.g., vendors, guests, budget)
  }