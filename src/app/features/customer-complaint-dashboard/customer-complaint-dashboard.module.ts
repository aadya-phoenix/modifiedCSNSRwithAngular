import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComplaintFilterComponent } from './complaint-filter/complaint-filter.component';
import { CountersComponent } from './counters/counters.component';
import { GraphsComponent } from './graphs/graphs.component';




@NgModule({
  declarations: [
    ComplaintFilterComponent,
    CountersComponent,
    GraphsComponent
  ],
  imports: [
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatDialogModule
  ]
})
export class CustomerComplaintDashboardModule { }
