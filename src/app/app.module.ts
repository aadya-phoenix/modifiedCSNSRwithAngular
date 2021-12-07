import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './auth/login.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CsnsrHomeModule } from './features/csnsr-home/csnsr-home.module';
import { DatePipe } from '@angular/common';
import { DashboardAnalyticsModule } from './features/dashboard-analytics/dashboard-analytics.module';
import { CustomerComplaintDashboardModule } from './features/customer-complaint-dashboard/customer-complaint-dashboard.module';
import { SettingsModule } from './features/settings/settings.module';
import { TransactionsModule } from './features/transactions/transactions.module';
import { CompanyModule } from './features/masters/company/company.module';
import { LanguageModule } from './features/masters/language/language.module';
import { CountryModule } from './features/masters/country/country.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    LoginModule,
    DashboardModule,
    CsnsrHomeModule,
    DashboardAnalyticsModule,
    CustomerComplaintDashboardModule,
    SettingsModule,
    TransactionsModule,
    CompanyModule,
    LanguageModule,
    CountryModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
