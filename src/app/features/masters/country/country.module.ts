import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CountryComponent } from './country.component';
import { CountryUploadComponent } from './country-upload/country-upload.component';
import { CountryReportComponent } from './country-report/country-report.component';
import { SmsSetupComponent } from './sms-setup/sms-setup.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LevelMasterComponent } from '../level-master/level-master.component';
import { SubLevelComponent } from '../sub-level/sub-level.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';




@NgModule({
  declarations: [
    CountryComponent,
    CountryUploadComponent,
    CountryReportComponent,
    SmsSetupComponent,
    EmailTemplateComponent,
    LevelMasterComponent,
    SubLevelComponent,
    
    
  ],entryComponents:[
    CountryUploadComponent,
    CountryReportComponent,
    SmsSetupComponent,
    EmailTemplateComponent
  ],
  imports: [
    SharedModule,
    CKEditorModule,
    MatDialogModule,
    Ng2SearchPipeModule
  ]
})
export class CountryModule { }
