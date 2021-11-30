import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DashboardFilterComponent } from './dashboard-filter/dashboard-filter.component';
import { DashboardCountersComponent } from './dashboard-counters/dashboard-counters.component';
import { DashboardGraphsComponent } from './dashboard-graphs/dashboard-graphs.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule}  from '@angular/material/dialog';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [
    DashboardFilterComponent,
    DashboardCountersComponent,
    DashboardGraphsComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatDialogModule
  ]
})
export class DashboardModule { }
