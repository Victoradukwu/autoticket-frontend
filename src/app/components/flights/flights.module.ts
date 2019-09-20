import { flightRoutes } from './flight-routings';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightListComponent } from './flight-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FlightListComponent],
  imports: [
		CommonModule,
		NgxSpinnerModule,
		RouterModule.forChild(flightRoutes)
	],
	exports: [ FlightListComponent ]
})
export class FlightsModule { }
