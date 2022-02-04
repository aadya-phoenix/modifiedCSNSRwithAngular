import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LanguageComponent } from './language.component';
import { AddUploadComponent } from './add-upload/add-upload.component';
import { ReportComponent } from './report/report.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    LanguageComponent,
    AddUploadComponent,
    ReportComponent,
  
  ],
  entryComponents:[
   AddUploadComponent,
   ReportComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    Ng2SearchPipeModule
  ]
})
export class LanguageModule { }
