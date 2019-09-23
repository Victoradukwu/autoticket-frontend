export interface IFlight {
  id?: number;
	departure?: string;
	destination?: string;
	fare?: number;
	status?: number;
	number?: string;
	departure_time?: string;
	departure_date?: string;
	available_seats?: number[];
}