import { NgModule } from '@angular/core';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { SharedModule } from '../../../shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SurveyComponent } from './survey.component';



@NgModule({
  declarations: [
    SurveyComponent
  ],
  imports: [
    SharedModule,
    CKEditorModule,
    DigitOnlyModule
  ]
})
export class SurveyModule { }
