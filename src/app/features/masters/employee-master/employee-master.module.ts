import { NgModule } from '@angular/core';
import { SharedModule} from '../../../shared/shared.module';
import { EmployeeMasterComponent } from './employee-master.component';
import { DealerEmployeeUploadComponent } from './dealer-employee-upload/dealer-employee-upload.component';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    EmployeeMasterComponent,
    DealerEmployeeUploadComponent,
    EmployeeReportComponent
  ],
  entryComponents:[
    DealerEmployeeUploadComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    Ng2SearchPipeModule
  ]
})
export class EmployeeMasterModule { }
