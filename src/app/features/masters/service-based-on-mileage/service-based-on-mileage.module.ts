import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ServiceBasedOnMileageComponent } from './service-based-on-mileage.component';



@NgModule({
  declarations: [
    ServiceBasedOnMileageComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ServiceBasedOnMileageModule { }
