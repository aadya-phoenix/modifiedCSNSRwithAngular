import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';
import { DissatisfiedCustomersComponent } from './dissatisfied-customers.component';
import { DissatisfiedCustomersFormComponent } from './dissatisfied-customers-form/dissatisfied-customers-form.component';
import { CustomerFeedbackOverallComponent } from './customer-feedback-overall/customer-feedback-overall.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    DissatisfiedCustomersComponent,
    DissatisfiedCustomersFormComponent,
    CustomerFeedbackOverallComponent
  ],
  imports: [
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule, 
    Ng2SearchPipeModule,
    NgxPaginationModule
  ]
})
export class DissatisfiedCustomersModule { }
