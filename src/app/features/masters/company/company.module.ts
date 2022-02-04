import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CompanyComponent } from './company.component';



@NgModule({
  declarations: [
    CompanyComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class CompanyModule { }
