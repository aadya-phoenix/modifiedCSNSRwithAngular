import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ServiceUploadComponent } from './service-upload.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ServiceUploadComponent,
  ],
  imports: [
    SharedModule,
    MatDialogModule
  ]
})
export class ServiceUploadModule { }
