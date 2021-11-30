import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { CsnsrHomeComponent } from './features/csnsr-home/csnsr-home.component';
import { FilterComponent } from './features/dashboard-analytics/filter/filter.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ComplaintFilterComponent } from './features/customer-complaint/complaint-filter/complaint-filter.component';
const routes: Routes = [
  
  {
    path:'csnsr', component:CsnsrHomeComponent,
    children:[{
      path:'dashboard', component:DashboardComponent
    },{
      path:'analytics', component:FilterComponent
    },{
      path:'ccomplaint',component:ComplaintFilterComponent
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
