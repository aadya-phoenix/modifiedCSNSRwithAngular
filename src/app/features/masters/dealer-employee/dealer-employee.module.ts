import { NgModule } from '@angular/core';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from '../../../shared/shared.module';
import { DealerEmployeeComponent } from './dealer-employee.component';
import { DealerEmployeeUploadComponent } from './dealer-employee-upload/dealer-employee-upload.component';
import {  MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    DealerEmployeeComponent,
    DealerEmployeeUploadComponent
  ],
  imports: [
    SharedModule,
    DigitOnlyModule,
    Ng2SearchPipeModule,
    MatDialogModule
  ]
})
export class DealerEmployeeModule { }
