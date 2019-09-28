import { AuthGuard } from './../../guards/auth-guard.guard';
import { TicketsListComponent } from './tickets-list.component';
import { Routes } from '@angular/router';
import { CreateTicketComponent } from './create-ticket.component';


export const ticketRoutes: Routes = [
  { path: 'tickets/create/:fltNumber', component: CreateTicketComponent, canActivate: [AuthGuard] },
  { path: 'tickets/list', component: TicketsListComponent }
];
