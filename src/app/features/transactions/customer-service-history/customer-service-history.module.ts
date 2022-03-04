import { NgModule } from '@angular/core';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { SharedModule } from '../../../shared/shared.module';
import { CustomerServiceHistoryComponent } from './customer-service-history.component';



@NgModule({
  declarations: [
    CustomerServiceHistoryComponent
  ],
  imports: [
    SharedModule,
    DigitOnlyModule
  ]
})
export class CustomerServiceHistoryModule { }
