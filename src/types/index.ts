export interface FlightBooking {
  from: string;
  to: string;
  departureDate: string;
  passengers: number;
  class: 'economy' | 'business' | 'first';
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface HotelReservation {
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface DestinationBooking {
  destination: string;
  travelDate: string;
  travelers: number;
  packageType: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface ContactForm {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}
