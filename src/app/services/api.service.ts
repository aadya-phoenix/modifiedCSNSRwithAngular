import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from 'src/app/constants/constants.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  appUrl = "http://localhost:52268/api/";

  session = this.constantService.takeSession()

  constructor(
    private httpClient: HttpClient,
    private constantService:ConstantsService
  ) { }

  getLabel(): Observable<any> {
    return this.httpClient.get(this.appUrl + 'Label/GetLabelConvertedLanguage');
  }

  //inuse
  dashboard_bkCounters(obj: any) {
    return this.httpClient.post(this.appUrl + 'Dashboard_bk/Dashboard_bkCounters', obj, {});
  }

  instantSatisfactionTrend(obj: any) {
    return this.httpClient.post(this.appUrl + 'Customer/InstantSatisfactionTrend', obj, {});
  }

  //inuse
  questionFeedbackReport(obj: any) {
    return this.httpClient.post(this.appUrl + 'Customer/QuestionFeedbackReport', obj, {});
  }

  getDealerCSIForInstantFeedback(obj: any) {
    return this.httpClient.post(this.appUrl + 'Customer/GetDealerCSIForInstantFeedback', obj, {});
  }

  //inuse
  surveyDashboard_bkCounters(obj: any) {

    return this.httpClient.post(this.appUrl + 'Dashboard_bk/SurveyDashboard_bkCounters', obj, {});
  };

  //inuse
  questionSurveyAvgScore(obj: any) {
    return this.httpClient.post(this.appUrl + 'Customer/QuestionSurveyAvgScore', obj, {});
  };

  //inuse
  dashboard_bkSurveyRatingAnalysis(obj: any) {
    return this.httpClient.post(this.appUrl + 'Dashboard_bk/Dashboard_bkSurveyRatingAnalysis', obj, {});
  };


  //inuse
  getDealerCSIForSurvey(obj: any) {
    return this.httpClient.post(this.appUrl + 'Customer/GetDealerCSIForSurvey', obj, {});
  };

  //inuse
  getCustomerSatisfaction(obj: any) {
    return this.httpClient.post(this.appUrl + 'Customer/GetCustomerSatisfaction', obj, {});
  };

  getFreshLeadCount(obj: any) {

    if ((this.session.Country_Id === 15) || (this.session.RoleName === 'HOAdmin' && obj.Country_Id === 15)) {

      return this.httpClient.post(this.appUrl + 'CustomerSMR/GetFreshLeadCountIndia2W', obj, {});

    }
    else {

      return this.httpClient.post(this.appUrl + 'CustomerSMR/GetFreshLeadCount', obj, {});
    }

  };

  getFollowUpLeadCount(obj: any) {

    if ((this.session.Country_Id === 15) || (this.session.RoleName === 'HOAdmin' && obj.Country_Id === 15)) {

      return this.httpClient.post(this.appUrl + 'CustomerSMR/GetFollowUpLeadCountDashboardIndia2W', obj, {});

    }
    else {

      return this.httpClient.post(this.appUrl + 'CustomerSMR/GetFollowUpLeadCountDashboard', obj, {});
    }

  };

  getNonContactLeadCount(obj: any) {

    if ((this.session.Country_Id === 15) || (this.session.RoleName === 'HOAdmin' && obj.Country_Id === 15)) {

      return this.httpClient.post(this.appUrl + 'CustomerSMR/GetNonContactLeadCountDashboardIndia2W', obj, {});

    }
    else {

      return this.httpClient.post(this.appUrl + 'CustomerSMR/GetNonContactLeadCountDashboard', obj, {});
    }

  };

  getBookingLeadCount(obj: any) {

    if ((this.session.Country_Id === 15) || (this.session.RoleName === 'HOAdmin' && obj.Country_Id === 15)) {

      return this.httpClient.post(this.appUrl + 'CustomerSMR/GetBookingLeadCountDashboardIndia2W', obj, {});

    }
    else {

      return this.httpClient.post(this.appUrl + 'CustomerSMR/GetBookingLeadCountDashboard', obj, {});
    }

  };

  getServiceDueVsDoneForVehicle(obj: any) {

    if ((this.session.Country_Id === 15) || (this.session.RoleName === 'HOAdmin' && obj.Country_Id === 15)) {

      return this.httpClient.post(this.appUrl + 'CustomerSMR/GetServiceDueVsDoneForVehicleIndia2W', obj, {});

    }
    else {

      return this.httpClient.post(this.appUrl + 'CustomerSMR/GetServiceDueVsDoneForVehicle', obj, {});
    }

  };

  getSMRConvertedCountDashboard(obj: any) {


    if ((this.session.Country_Id === 15) || (this.session.RoleName === 'HOAdmin' && obj.Country_Id === 15)) {

      return this.httpClient.post(this.appUrl + 'CustomerSMR/GetSMRConvertedCountDashboardIndia2W', obj, {});

    }
    else {

      return this.httpClient.post(this.appUrl + 'CustomerSMR/GetSMRConvertedCountDashboard', obj, {});
    }

  };

  getServiceDue(obj: any) {

    if ((this.session.Country_Id === 15) || (this.session.RoleName === 'HOAdmin' && obj.Country_Id === 15)) {

      return this.httpClient.post(this.appUrl + 'CustomerSMR/GetServiceDueIndia2W', obj, {});
    }
    else {

      return this.httpClient.post(this.appUrl + 'CustomerSMR/GetServiceDue', obj, {});
    }
  };

  //inuse
  PSFServiceDashboard_bkCounters(obj: any) {

    return this.httpClient.post(this.appUrl + 'Dashboard_bk/PSFServiceDashboard_bkCounters', obj, {});
  };

  //inuse
  PSFSalesDashboard_bkCounters(obj: any) {

    return this.httpClient.post(this.appUrl + 'Dashboard_bk/PSFSalesDashboard_bkCounters', obj, {});
  };


  getDealerOutletList(id: number) {

    return this.httpClient.get(this.appUrl + 'Dealer/GetOutLetListForDDLByUser?UserId=' + id);
  };

  getOutLetListByCountry(id: number) {

    return this.httpClient.get(this.appUrl + 'Dealer/GetOutLetListByCountry?CountryId=' + id);
  };

  getTargetAchivement(obj: any) {

    return this.httpClient.post(this.appUrl + 'Customer/GetTargetAchivement', obj, {});
  };

  getMonthWiseTargetAchivementForIFC(obj: any) {
    return this.httpClient.post(this.appUrl + 'Customer/GetMonthWiseTargetAchivementForIFC', obj, {});
  };

  getMonthWiseTargetAchivementForService(obj: any) {
    return this.httpClient.post(this.appUrl + 'Customer/GetMonthWiseTargetAchivementForService', obj, {});
  };

  getMonthWiseTargetAchivementForSMR(obj: any) {
    return this.httpClient.post(this.appUrl + 'Customer/GetMonthWiseTargetAchivementForSMR', obj, {});
  };

  getMonthWiseTargetAchivementForEmail(obj: any) {
    return this.httpClient.post(this.appUrl + 'Customer/GetMonthWiseTargetAchivementForEmail', obj, {});
  };

  getMonthWiseTargetAchivementForPSF(obj: any) {
    return this.httpClient.post(this.appUrl + 'Customer/GetMonthWiseTargetAchivementForPSF', obj, {});
  };

  getCountryList() {
    return this.httpClient.get(this.appUrl + 'Country/GetCountryListForDDL');
  };

  getVehicleTypeForDDL() {

    return this.httpClient.get(this.appUrl + 'Company/GetVehicleTypeForDDL');
  };

  QuestionWiseTrend(obj: any) {
    return this.httpClient.post(this.appUrl + 'Customer/QuestionWiseTrend', obj, {});
  };

  getBrandTagForDDL():Observable<any>{
    return this.httpClient.get(this.appUrl + 'Company/GetBrandTagForDDL');
  }
  customerComplaintDashBoardCounters(obj:any){
    return this.httpClient.post(this.appUrl+'Dashboard_bk/CustomerComplaintDashBoardCounters',obj, {});
  }

  getCustomerByVIN(id:string,uid:number){
    return this.httpClient.get(this.appUrl + 'Customer/GetCustomerForComplaint?VIN=' + id + '&UserId=' + uid);
  }

  getSAList(id:number){
    return this.httpClient.get(this.appUrl + 'Dealer/GetSAList?DealerId=' + id);
  }
  getTecnicianList(id:number){
    return this.httpClient.get(this.appUrl + 'Dealer/GetTecnicianList?DealerId=' + id);
  }

  getComplaintSource(){
    return this.httpClient.get(this.appUrl + 'Customer/GetComplaintSource');
  }
  saveResponse(obj:any){
    return this.httpClient.post(this.appUrl+ 'Customer/CreateComplaint/', obj, {});
  }

  getServiceTypeList(id:number){
    return this.httpClient.get(this.appUrl + 'Dealer/GetServiceTypeListByVehicleForCC?VehicleId=' + id);
  }
  getVehicleList(id:number){
    return this.httpClient.get(this.appUrl + 'Company/GetVehicleListByCountry?CountryId=' + id);
  }

}
