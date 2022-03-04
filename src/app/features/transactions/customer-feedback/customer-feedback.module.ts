import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CustomerFeedbackComponent } from './customer-feedback.component';
import { CustomerFeedbackFormComponent } from './customer-feedback-form/customer-feedback-form.component';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    CustomerFeedbackComponent,
    CustomerFeedbackFormComponent
  ],
  imports: [
    SharedModule,
    DigitOnlyModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,

  ]
})
export class CustomerFeedbackModule { }
