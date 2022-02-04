import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module'
import { CityComponent } from './city.component';
import { CityUploadComponent } from './city-upload/city-upload.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { CityReportComponent } from './city-report/city-report.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    CityComponent,
    CityUploadComponent,
    CityReportComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    Ng2SearchPipeModule
  ]
})
export class CityModule { }
