import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { PendingSurveyComponent } from './pending-survey.component';



@NgModule({
  declarations: [
    PendingSurveyComponent
  ],
  imports: [
    SharedModule
  ]
})
export class PendingSurveyModule { }
