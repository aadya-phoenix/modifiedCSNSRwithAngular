import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';
import { CustomerComplaintFormComponent } from './customer-complaint-form/customer-complaint-form.component';
import { CustomerComplaintComponent } from './customer-complaint.component';



@NgModule({
  declarations: [
    CustomerComplaintComponent,
    CustomerComplaintFormComponent,
  ],
  imports: [
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ]
})
export class CustomerComplaintModule { }
