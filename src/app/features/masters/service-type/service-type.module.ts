import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ServiceTypeComponent } from './service-type.component';
import { ServiceTypeUploadComponent } from './service-type-upload/service-type-upload.component';
import { ServiceTypeReportComponent } from './service-type-report/service-type-report.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    ServiceTypeComponent,
    ServiceTypeUploadComponent,
    ServiceTypeReportComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    DigitOnlyModule,
    Ng2SearchPipeModule
  ]
})
export class ServiceTypeModule { }
