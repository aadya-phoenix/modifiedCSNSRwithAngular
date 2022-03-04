import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { EmailSetupComponent } from './email-setup.component';



@NgModule({
  declarations: [
    EmailSetupComponent
  ],
  imports: [
    SharedModule
  ]
})
export class EmailSetupModule { }
