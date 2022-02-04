import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { CsnsrHomeComponent } from './features/home/csnsr-home.component';
import { FilterComponent } from './features/dashboard-analytics/filter/filter.component';
import { ComplaintFilterComponent } from './features/customer-complaint-dashboard/complaint-filter/complaint-filter.component';
import { DashboardFilterComponent } from './features/dashboard/dashboard-filter/dashboard-filter.component';
import { CustomerComplaintComponent } from './features/transactions/customer-complaint/customer-complaint.component';
import { CompanyComponent } from './features/masters/company/company.component';
import { LanguageComponent } from './features/masters/language/language.component';
import { CountryComponent } from './features/masters/country/country.component';
import { LevelMasterComponent } from './features/masters/level-master/level-master.component';
import { SubLevelComponent } from './features/masters/sub-level/sub-level.component';
import { TsmMasterComponent } from './features/masters/tsm-master/tsm-master.component';
import { EmployeeMasterComponent } from './features/masters/employee-master/employee-master.component';
import { StateComponent } from './features/masters/state-master/state.component';
import { CityComponent } from './features/masters/city/city.component';
import { DistributorComponent } from './features/masters/distributor/distributor.component';
import { DealerGroupComponent } from './features/masters/dealer-group/dealer-group.component';
import { DealerOutletComponent } from './features/masters/dealer-outlet/dealer-outlet.component';
import { VehicleComponent } from './features/masters/vehicle/vehicle.component';
import { ServiceTypeComponent } from './features/masters/service-type/service-type.component';
import { QuestionComponent } from './features/masters/question/question.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
const routes: Routes = [
  
  {
    path:'index', component:CsnsrHomeComponent,
    children:[{
      path:'dashboard', component:DashboardFilterComponent
    },{
      path:'cp',component:ChangePasswordComponent
    },{
      path:'analytics', component:FilterComponent
    },{
      path:'ccdashboard',component:ComplaintFilterComponent
    },{
      path:'tcc', component:CustomerComplaintComponent
    },{
      path:'Company', component:CompanyComponent
    },{
      path:'Language', component:LanguageComponent
    },{
      path:'Country', component:CountryComponent
    },{
      path:'levelMaster/:id', component:LevelMasterComponent
    },{
      path:'levelDetail/:id', component:SubLevelComponent
    },
    {
      path:'TSM/:id', component:TsmMasterComponent
    },
    {
      path:'TSM', component:TsmMasterComponent
    },
    {
      path:'CountryWiseEmployee/:id', component:EmployeeMasterComponent
    },
    {
      path:'CountryWiseEmployee', component:EmployeeMasterComponent
    },
    {
      path:'State', component:StateComponent
    },
    {
      path:'City',component:CityComponent
    },{
      path:'Distributor',component: DistributorComponent
    },{
      path:'Dealer', component:DealerGroupComponent
    },{
      path: 'Outlet', component:DealerOutletComponent
    },{
      path: 'Vehicle', component:VehicleComponent 
    },{
      path:'ServiceType', component:ServiceTypeComponent
    },
    {
      path:'Question', component:QuestionComponent
    }
  ]
  },
  {path:'login', component:LoginComponent},
  {path:'#',component:DashboardFilterComponent},
  {
    path:'**', component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
