import { NgModule } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from '../../../shared/shared.module';
import { LabelComponent } from './label.component';
import { EditLabelComponent } from './edit-label/edit-label.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    LabelComponent,
    EditLabelComponent
  ],

  imports: [
    SharedModule,
    Ng2SearchPipeModule,
    MatDialogModule
  ]
})
export class LabelModule { }
