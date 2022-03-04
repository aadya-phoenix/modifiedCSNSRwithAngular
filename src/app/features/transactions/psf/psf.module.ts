import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../../../shared/shared.module';
import { PsfComponent } from './psf.component';
import { PsfCountersComponent } from './psf-counters/psf-counters.component';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PsfViewComponent } from './psf-view/psf-view.component';
import { CustomerFeedbackViewComponent } from './customer-feedback-view/customer-feedback-view.component';



@NgModule({
  declarations: [
    PsfComponent,
    PsfCountersComponent,
    PsfViewComponent,
    CustomerFeedbackViewComponent,
  ],
  imports: [
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatDialogModule,
    Ng2SearchPipeModule
  ]
})
export class PsfModule { }
