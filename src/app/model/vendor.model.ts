export interface Vendor {
    id: number;
    name: string;
    available: boolean;
    serviceType: string;
    contactInfo: string;
    rating: number;
    event?: {
        id: number;
        // Add other Event properties if needed
    };
}
