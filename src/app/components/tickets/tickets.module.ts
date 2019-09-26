import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTicketComponent } from './create-ticket.component';
import { RouterModule } from '@angular/router';
import { ticketRoutes } from './ticket-routing';

@NgModule({
  declarations: [CreateTicketComponent],
  imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(ticketRoutes)
  ]
})
export class TicketsModule { }
