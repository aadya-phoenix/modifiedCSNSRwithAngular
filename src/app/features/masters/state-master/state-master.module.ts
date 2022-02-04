import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { StateComponent } from './state.component';
import { StateUploadComponent } from './state-upload/state-upload.component';
import { StateReportComponent } from './state-report/state-report.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    StateComponent,
    StateUploadComponent,
    StateReportComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    Ng2SearchPipeModule
  ]
})
export class StateMasterModule { }
