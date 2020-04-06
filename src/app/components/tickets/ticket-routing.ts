import { AuthGuard } from 'src/app/guards/auth-guard.guard';
import { TicketsListComponent } from './tickets-list.component';
import { Routes } from '@angular/router';
import { CreateTicketComponent } from './create-ticket.component';
import { UserTicketsComponent } from './user-tickets.component';


export const ticketRoutes: Routes = [
  { path: 'tickets/create/:fltNumber/:fare', component: CreateTicketComponent, canActivate: [AuthGuard] },
  { path: 'tickets/list', component: TicketsListComponent, canActivate: [AuthGuard] },
  { path: 'tickets/user-tickets', component: UserTicketsComponent, canActivate: [AuthGuard] }
];
