import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FilterComponent } from './filter/filter.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule}  from '@angular/material/dialog';
import { CountersComponent } from './counters/counters.component';




@NgModule({
  declarations: [
    FilterComponent,
    CountersComponent,
    
  ],
  imports: [
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatDialogModule
  ]
})
export class DashboardAnalyticsModule { }
