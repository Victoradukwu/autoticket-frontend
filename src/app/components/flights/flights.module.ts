import { flightRoutes } from './flight-routings';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightListComponent } from './flight-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { FlightEditComponent } from './flight-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FlightListComponent, FlightEditComponent],
  imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgxSpinnerModule,
		RouterModule.forChild(flightRoutes)
	]
})
export class FlightsModule { }
