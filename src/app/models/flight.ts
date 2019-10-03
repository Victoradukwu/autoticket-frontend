export interface IFlight {
  id?: number;
  departure?: string;
  destination?: string;
  fare?: number;
  status?: number;
  number?: string;
  departureTime?: string;
  departureDate?: string;
  availableSeats?: number[];
}
