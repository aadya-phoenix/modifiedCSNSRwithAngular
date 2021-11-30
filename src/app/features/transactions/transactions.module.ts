import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComplaintComponent } from './customer-complaint/customer-complaint.component';
import { PendingCustomerComplaintComponent } from './pending-customer-complaint/pending-customer-complaint.component';
import { ServiceHistoryComponent } from './service-history/service-history.component';
import { CustomerComplaintFormComponent } from './customer-complaint/customer-complaint-form.component';



@NgModule({
  declarations: [
    CustomerComplaintComponent,
    PendingCustomerComplaintComponent,
    ServiceHistoryComponent,
    CustomerComplaintFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TransactionsModule { }
