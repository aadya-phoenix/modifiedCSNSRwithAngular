import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { CsnsrHomeComponent } from './features/csnsr-home/csnsr-home.component';
import { FilterComponent } from './features/dashboard-analytics/filter/filter.component';
import { ComplaintFilterComponent } from './features/customer-complaint-dashboard/complaint-filter/complaint-filter.component';
import { DashboardFilterComponent } from './features/dashboard/dashboard-filter/dashboard-filter.component';
import { CustomerComplaintComponent } from './features/transactions/customer-complaint/customer-complaint.component';
const routes: Routes = [
  
  {
    path:'csnsr', component:CsnsrHomeComponent,
    children:[{
      path:'dashboard', component:DashboardFilterComponent
    },{
      path:'analytics', component:FilterComponent
    },{
      path:'ccomplaint',component:ComplaintFilterComponent
    },{
      path:'tcc', component:CustomerComplaintComponent
    }]
  },
  {path:'login', component:LoginComponent},
  {
    path:'**', component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
