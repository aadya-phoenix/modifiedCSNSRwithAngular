import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { DealerOutletComponent } from './dealer-outlet.component';
import { DealerOutletUploadComponent } from './dealer-outlet-upload/dealer-outlet-upload.component';
import { OutletReportComponent } from './outlet-report/outlet-report.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    DealerOutletComponent,
    DealerOutletUploadComponent,
    OutletReportComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    Ng2SearchPipeModule
  ]
})
export class DealerOutletModule { }
