export interface Guest {
    id: number;
    name: string;
    email: string;
    phone: string;
    eventId: number; // Add this to link the guest with an event
  }