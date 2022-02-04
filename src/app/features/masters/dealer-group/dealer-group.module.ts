import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { DealerGroupComponent } from './dealer-group.component';
import { AddDealerComponent } from './add-dealer/add-dealer.component';
import { DealerReportComponent } from './dealer-report/dealer-report.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    DealerGroupComponent,
    AddDealerComponent,
    DealerReportComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    Ng2SearchPipeModule
  ]
})
export class DealerGroupModule { }
