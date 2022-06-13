import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './auth/login.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { CsnsrHomeModule } from './features/home/csnsr-home.module';
import { DatePipe } from '@angular/common';
import { DashboardAnalyticsModule } from './features/dashboard-analytics/dashboard-analytics.module';
import { CustomerComplaintDashboardModule } from './features/customer-complaint-dashboard/customer-complaint-dashboard.module';

import { CompanyModule } from './features/masters/company/company.module';
import { LanguageModule } from './features/masters/language/language.module';
import { CountryModule } from './features/masters/country/country.module';
import { MaterialDesignModule } from './material-design/material-design.module';
import { EmployeeMasterModule } from './features/masters/employee-master/employee-master.module';
import { StateMasterModule } from './features/masters/state-master/state-master.module';
import { CityModule } from './features/masters/city/city.module';
import { DistributorModule } from './features/masters/distributor/distributor.module';
import { DealerGroupModule } from './features/masters/dealer-group/dealer-group.module';
import { DealerOutletModule } from './features/masters/dealer-outlet/dealer-outlet.module';
import { VehicleModule } from './features/masters/vehicle/vehicle.module';
import { ServiceTypeModule } from './features/masters/service-type/service-type.module';
import { QuestionModule } from './features/masters/question/question.module';
import { TsmModule } from './features/masters/tsm-master/tsm.module';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './essentials/network.interceptor';
import { LabelModule } from './features/masters/label/label.module';
import { SurveyModule } from './features/masters/survey/survey.module';
import { EmailSetupModule } from './features/masters/email-setup/email-setup.module';
import { AutomatedSurveyModule } from './features/masters/automated-survey/automated-survey.module';
import { ServiceBasedOnMileageModule } from './features/masters/service-based-on-mileage/service-based-on-mileage.module';
import { DealerEmployeeModule } from './features/masters/dealer-employee/dealer-employee.module';
import { DealerOutletMapModule } from './features/masters/dealer-outlet-map/dealer-outlet-map.module';
import { ServiceUploadModule } from './features/transactions/service-upload/service-upload.module';
import { SalesUploadModule } from './features/transactions/sales-upload/sales-upload.module';
import { CustomerFeedbackModule } from './features/transactions/customer-feedback/customer-feedback.module';
import { PsfModule } from './features/transactions/psf/psf.module';
import { PendingSurveyModule } from './features/transactions/pending-survey/pending-survey.module';
import { DirectBookingModule } from './features/transactions/direct-booking/direct-booking.module';
import { DissatisfiedCustomersModule } from './features/transactions/dissatisfied-customers/dissatisfied-customers.module';
import { CustomerComplaintModule } from './features/transactions/customer-complaint/customer-complaint.module';
import { CustomerServiceHistoryModule } from './features/transactions/customer-service-history/customer-service-history.module';

import { IfcReportsModule } from './features/reports/ifc-reports/ifc-reports.module';






@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    
   
    //SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    LoginModule,
    DashboardModule,
    CsnsrHomeModule,
    DashboardAnalyticsModule,
    CustomerComplaintDashboardModule,
    CompanyModule,
    LanguageModule,
    CountryModule,
    MaterialDesignModule,
    EmployeeMasterModule,
    StateMasterModule,
    CityModule,
    DistributorModule,
    DealerGroupModule,
    DealerOutletModule,
    VehicleModule,
    ServiceTypeModule,
    QuestionModule,
    TsmModule,
    LabelModule,
    SurveyModule,
    EmailSetupModule,
    AutomatedSurveyModule,
    ServiceBasedOnMileageModule,
    DealerEmployeeModule,
    DealerOutletMapModule,
    ServiceUploadModule,
    SalesUploadModule,
    CustomerFeedbackModule,
    PsfModule,
    PendingSurveyModule,
    DirectBookingModule,
    DissatisfiedCustomersModule,
    CustomerComplaintModule,
    CustomerServiceHistoryModule,
    
    IfcReportsModule
   
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:NetworkInterceptor,
    multi:true
  },
     DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
