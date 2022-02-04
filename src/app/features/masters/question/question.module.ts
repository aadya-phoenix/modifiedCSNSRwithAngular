import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { QuestionComponent } from './question.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { MatTableModule} from '@angular/material/table';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    QuestionComponent
  ],
  imports: [
    SharedModule,
    MatTableModule,
    NgxPaginationModule,
    DigitOnlyModule,
    Ng2SearchPipeModule
  ]
})
export class QuestionModule { }
