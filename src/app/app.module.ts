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

import { TransactionsModule } from './features/transactions/transactions.module';
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
   
    TransactionsModule,
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
    TsmModule
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
