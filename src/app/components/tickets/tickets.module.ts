import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTicketComponent } from './create-ticket.component';
import { RouterModule } from '@angular/router';
import { ticketRoutes } from './ticket-routing';
import { TicketsListComponent } from './tickets-list.component';
import { UserTicketsComponent } from './user-tickets.component';

@NgModule({
  declarations: [CreateTicketComponent, TicketsListComponent, UserTicketsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ticketRoutes)
  ]
})
export class TicketsModule { }
