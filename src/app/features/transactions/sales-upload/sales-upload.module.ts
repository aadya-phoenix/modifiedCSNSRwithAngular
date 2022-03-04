import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { SalesUploadComponent } from './sales-upload.component';



@NgModule({
  declarations: [
    SalesUploadComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SalesUploadModule { }
