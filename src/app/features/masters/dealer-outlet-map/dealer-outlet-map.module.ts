import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DealerOutletMapComponent } from './dealer-outlet-map.component';


@NgModule({
  declarations: [
    DealerOutletMapComponent
  ],
  imports: [
    
    SharedModule,
    Ng2SearchPipeModule,
    DigitOnlyModule
  ]
})
export class DealerOutletMapModule { }
