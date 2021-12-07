import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { CompanyComponent } from './company.component';



@NgModule({
  declarations: [
    CompanyComponent
  ],
  imports: [
    SharedModule,
    NgxTrimDirectiveModule
  ]
})
export class CompanyModule { }
