import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { DistributorComponent } from './distributor.component';
import { DistributorUploadComponent } from './distributor-upload/distributor-upload.component';
import { DistributorReportComponent } from './distributor-report/distributor-report.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    DistributorComponent,
    DistributorUploadComponent,
    DistributorReportComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    Ng2SearchPipeModule
  ]
})
export class DistributorModule { }
