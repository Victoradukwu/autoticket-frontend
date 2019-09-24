import { CreateSeatComponent } from './create-seat.component';
import { FlightListComponent } from './flight-list.component';
import { Routes } from '@angular/router';
import { FlightEditComponent } from './flight-edit.component';


export const flightRoutes: Routes = [
  { path: 'flights/edit', component: FlightEditComponent },
  { path: 'flights/add-seat', component: CreateSeatComponent },
  { path: '', component: FlightListComponent }
];
