import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from '../../../shared/shared.module';
import { PendingIfcReportComponent } from './pending-ifc-report/pending-ifc-report.component';



@NgModule({
  declarations: [
    PendingIfcReportComponent
  ],
  imports: [
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule, 
    Ng2SearchPipeModule,
  ]
})
export class IfcReportsModule { }
