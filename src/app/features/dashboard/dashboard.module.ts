import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DashboardFilterComponent } from './dashboard-filter/dashboard-filter.component';
import { DashboardCountersComponent } from './dashboard-counters/dashboard-counters.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material/input';
import { MatNativeDateModule} from '@angular/material/core';
import { MatDialogModule}  from '@angular/material/dialog';
import { QuestionTrendComponent } from './question-trend/question-trend.component';
import { DashboardGraphsComponent } from './dashboard-graphs/dashboard-graphs.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';




@NgModule({
  declarations: [
    DashboardFilterComponent,
    DashboardCountersComponent,
    DashboardGraphsComponent,
    QuestionTrendComponent,
    ChangePasswordComponent,
   
  ], providers: [
   /*  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS } */
  ],
  entryComponents:[
    QuestionTrendComponent
  ],
  imports: [
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule, 
    MatDialogModule,

  ]
})
export class DashboardModule { }
