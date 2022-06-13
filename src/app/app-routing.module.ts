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
import { LabelComponent } from './features/masters/label/label.component';
import { EmailSetupComponent } from './features/masters/email-setup/email-setup.component';
import { AutomatedSurveyComponent } from './features/masters/automated-survey/automated-survey.component';
import { ServiceBasedOnMileageComponent } from './features/masters/service-based-on-mileage/service-based-on-mileage.component';
import { DealerEmployeeComponent } from './features/masters/dealer-employee/dealer-employee.component';
import { DealerOutletMapComponent } from './features/masters/dealer-outlet-map/dealer-outlet-map.component';
import { ServiceUploadComponent } from './features/transactions/service-upload/service-upload.component';
import { SalesUploadComponent } from './features/transactions/sales-upload/sales-upload.component';
import { CustomerFeedbackComponent } from './features/transactions/customer-feedback/customer-feedback.component';
import { PsfComponent } from './features/transactions/psf/psf.component';
import { DirectBookingComponent } from './features/transactions/direct-booking/direct-booking.component';
import { CustomerServiceHistoryComponent } from './features/transactions/customer-service-history/customer-service-history.component';
import { SurveyComponent } from './features/masters/survey/survey.component';
import { PendingSurveyComponent } from './features/transactions/pending-survey/pending-survey.component';
import { DissatisfiedCustomersComponent } from './features/transactions/dissatisfied-customers/dissatisfied-customers.component';
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
    },{
      path:'LabelMaster',component:LabelComponent
    },{
      path:'survey',component:SurveyComponent
    },{
      path:'EmailSetup',component:EmailSetupComponent
    },{
      path:'TriggerSurvey',component:AutomatedSurveyComponent
    },{
      path:'ServiceBasedOnMileage',component:ServiceBasedOnMileageComponent
    },
    {
      path:'Employee', component:DealerEmployeeComponent
    },{
      path:'DealerOutletDis',component:DealerOutletMapComponent
    },{
      path:'ServiceUpload',component:ServiceUploadComponent
    },{
      path:'SalesUpload',component:SalesUploadComponent
    },
    {
      path:'IFC',component:CustomerFeedbackComponent
    },{
      path:'PSF',component:PsfComponent
    },{
      path:'DB',component:DirectBookingComponent
    },{
      path:'CSH',component:CustomerServiceHistoryComponent
    },{
      path:'PendingSurvey',component:PendingSurveyComponent
    },{
      path:'DIS', component:DissatisfiedCustomersComponent
    },{
      path:'CC', component:CustomerComplaintComponent
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
