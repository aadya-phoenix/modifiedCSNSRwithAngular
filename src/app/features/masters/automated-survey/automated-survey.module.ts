import { NgModule } from '@angular/core';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { SharedModule } from '../../../shared/shared.module';
import { AutomatedSurveyComponent } from './automated-survey.component';



@NgModule({
  declarations: [
    AutomatedSurveyComponent
  ],
  imports: [
    SharedModule,
    DigitOnlyModule
  ]
})
export class AutomatedSurveyModule { }
