export interface BookingTicket {
  id: string;
  type: 'flight' | 'hotel' | 'destination';
  status: 'pending' | 'confirmed' | 'paid' | 'resolved' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  
  // Flight details
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: number;
  class?: string;
  
  // Personal details
  fullName: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  
  // Payment info
  paymentStatus: 'unpaid' | 'partial' | 'full';
  depositAmount?: number;
  totalAmount?: number;
  
  // Notes
  specialRequests?: string;
  adminNotes?: string;
}

// Get all tickets from localStorage
export const getAllTickets = (): BookingTicket[] => {
  if (typeof window === 'undefined') return [];
  const tickets = localStorage.getItem('savannahpulse_tickets');
  return tickets ? JSON.parse(tickets) : [];
};

// Get ticket by ID
export const getTicketById = (id: string): BookingTicket | null => {
  const tickets = getAllTickets();
  return tickets.find(t => t.id === id) || null;
};

// Create new ticket
export const createTicket = (ticket: Omit<BookingTicket, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'paymentStatus'>): BookingTicket => {
  const newTicket: BookingTicket = {
    ...ticket,
    id: `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    status: 'pending',
    paymentStatus: 'unpaid',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  const tickets = getAllTickets();
  tickets.push(newTicket);
  localStorage.setItem('savannahpulse_tickets', JSON.stringify(tickets));
  
  return newTicket;
};

// Update ticket status
export const updateTicketStatus = (id: string, status: BookingTicket['status'], paymentStatus?: BookingTicket['paymentStatus']): boolean => {
  const tickets = getAllTickets();
  const index = tickets.findIndex(t => t.id === id);
  
  if (index === -1) return false;
  
  tickets[index].status = status;
  tickets[index].updatedAt = new Date().toISOString();
  if (paymentStatus) tickets[index].paymentStatus = paymentStatus;
  
  localStorage.setItem('savannahpulse_tickets', JSON.stringify(tickets));
  return true;
};

// Get tickets by email
export const getTicketsByEmail = (email: string): BookingTicket[] => {
  const tickets = getAllTickets();
  return tickets.filter(t => t.email === email);
};