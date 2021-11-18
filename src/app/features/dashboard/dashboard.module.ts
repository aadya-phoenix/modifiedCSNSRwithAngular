import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardFilterComponent } from './dashboard-filter/dashboard-filter.component';
import { DashboardCountersComponent } from './dashboard-counters/dashboard-counters.component';
import { DashboardGraphsComponent } from './dashboard-graphs/dashboard-graphs.component';



@NgModule({
  declarations: [
    DashboardFilterComponent,
    DashboardCountersComponent,
    DashboardGraphsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
