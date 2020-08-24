import { flightRoutes } from './flight-routings';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightListComponent } from './flight-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { FlightEditComponent } from './flight-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateSeatComponent } from './create-seat.component';

@NgModule({
  declarations: [FlightListComponent, FlightEditComponent, CreateSeatComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forChild(flightRoutes)
  ]
})
export class FlightsModule { }
