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
import { DatepickerModule } from 'ng2-datepicker';




@NgModule({
  declarations: [
    DashboardFilterComponent,
    DashboardCountersComponent,
    DashboardGraphsComponent,
    QuestionTrendComponent,
    ChangePasswordComponent,
   
  ],
  entryComponents:[
    QuestionTrendComponent
  ],
  imports: [
    SharedModule,
    DatepickerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatDialogModule
  ]
})
export class DashboardModule { }
