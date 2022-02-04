import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsnsrHomeComponent } from './csnsr-home.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    CsnsrHomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class CsnsrHomeModule { }
