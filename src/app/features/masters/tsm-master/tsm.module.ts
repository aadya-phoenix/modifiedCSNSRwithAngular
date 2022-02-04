import { NgModule } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from '../../../shared/shared.module';
import { TsmMasterComponent } from './tsm-master.component';


@NgModule({
  declarations: [TsmMasterComponent],
  imports: [
    SharedModule,
    Ng2SearchPipeModule
  ]
})
export class TsmModule { }
