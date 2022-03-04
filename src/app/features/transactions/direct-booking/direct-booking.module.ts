import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { SharedModule } from '../../../shared/shared.module';
import { DirectBookingComponent } from './direct-booking.component';



@NgModule({
  declarations: [
    DirectBookingComponent
  ],
  imports: [
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    DigitOnlyModule
  ]
})
export class DirectBookingModule { }
