import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module'
import { VehicleComponent } from './vehicle.component';
import { VehicleUploadComponent } from './vehicle-upload/vehicle-upload.component';
import { VehicleReportComponent } from './vehicle-report/vehicle-report.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    VehicleComponent,
    VehicleUploadComponent,
    VehicleReportComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    Ng2SearchPipeModule
  ]
})
export class VehicleModule { }
