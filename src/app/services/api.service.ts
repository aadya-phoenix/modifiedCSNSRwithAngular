import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from 'src/app/constants/constants.service';
import { Search } from '../models/search.model';
import { LevelSearch } from '../models/levelSeach.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  //appUrl = this.constantService.AppUrl;
  session = this.constantService.takeSession();

  constructor(
    private httpClient: HttpClient,
    private constantService:ConstantsService
  ) { }

  getLabel(): Observable<any> {
    return this.httpClient.get('/api/Label/GetLabelConvertedLanguage');
  }

  getLevelListForZoneRegion(countryId:number, levelId:number) {
    return this.httpClient.get('/api/LevelDetail/GetLevelListForZoneRegion?Country_Id=' + countryId + '&Level_id=' + levelId);
   }

   getLevelList(id:number){
    return this.httpClient.get('/api/LevelDetail/GetLevelList?Country_Id=' + id);
   }
 
   getLevelDetailListForZoneRegion(data:LevelSearch){
    return this.httpClient.post('/api/LevelDetail/GetLevelDetailListForZoneRegion', data);   
 }
 getOutletListBySublevel(data:LevelSearch){
  return this.httpClient.post('/api/LevelDetail/GetOutletListBySublevel', data);
 }

  //inuse
  QuestionFeedbackReport(obj: Search) {
    return this.httpClient.post('/api/Customer/QuestionFeedbackReport', obj, {});
  }

  getDealerCSIForInstantFeedback(obj: any) {
    return this.httpClient.post('/api/Customer/GetDealerCSIForInstantFeedback', obj, {});
  }

    //inuse
    dashboard_bkCounters(obj: Search) {
      return this.httpClient.post('/api/Dashboard_bk/Dashboard_bkCounters', obj, {});
    }
  //inuse
  surveyDashboard_bkCounters(obj: Search) {

    return this.httpClient.post('/api/Dashboard_bk/SurveyDashboard_bkCounters', obj, {});
  }

  //inuse
  QuestionSurveyAvgScore(obj: any) {
    return this.httpClient.post('/api/Customer/QuestionSurveyAvgScore', obj, {});
  }

  //inuse
  dashboard_bkSurveyRatingAnalysis(obj: Search) {
    return this.httpClient.post('/api/Dashboard_bk/Dashboard_bkSurveyRatingAnalysis', obj, {});
  }


  //inuse
  getDealerCSIForSurvey(obj: any) {
    return this.httpClient.post('/api/Customer/GetDealerCSIForSurvey', obj, {});
  }

  //inuse
  getCustomerSatisfaction(obj: Search) {
    return this.httpClient.post('/api/Customer/GetCustomerSatisfaction', obj, {});
  }

  getFreshLeadCount(obj: any) {

    if ((this.session.Country_Id === 15) || (this.session.RoleName === 'HOAdmin' && obj.Country_Id === 15)) {

      return this.httpClient.post('/api/CustomerSMR/GetFreshLeadCountIndia2W', obj, {});

    }
    else {

      return this.httpClient.post('/api/CustomerSMR/GetFreshLeadCount', obj, {});
    }

  }

  getFollowUpLeadCount(obj: any) {

    if ((this.session.Country_Id === 15) || (this.session.RoleName === 'HOAdmin' && obj.Country_Id === 15)) {

      return this.httpClient.post('/api/CustomerSMR/GetFollowUpLeadCountDashboardIndia2W', obj, {});

    }
    else {

      return this.httpClient.post('/api/CustomerSMR/GetFollowUpLeadCountDashboard', obj, {});
    }

  }

  getNonContactLeadCount(obj: any) {

    if ((this.session.Country_Id === 15) || (this.session.RoleName === 'HOAdmin' && obj.Country_Id === 15)) {

      return this.httpClient.post('/api/CustomerSMR/GetNonContactLeadCountDashboardIndia2W', obj, {});

    }
    else {

      return this.httpClient.post('/api/CustomerSMR/GetNonContactLeadCountDashboard', obj, {});
    }

  }

  getBookingLeadCount(obj: any) {

    if ((this.session.Country_Id === 15) || (this.session.RoleName === 'HOAdmin' && obj.Country_Id === 15)) {

      return this.httpClient.post('/api/CustomerSMR/GetBookingLeadCountDashboardIndia2W', obj, {});

    }
    else {

      return this.httpClient.post('/api/CustomerSMR/GetBookingLeadCountDashboard', obj, {});
    }

  }

  getServiceDueVsDoneForVehicle(obj:Search) {

    if ((this.session.Country_Id === 15) || (this.session.RoleName === 'HOAdmin' && obj.Country_Id === 15)) {

      return this.httpClient.post('/api/CustomerSMR/GetServiceDueVsDoneForVehicleIndia2W', obj, {});

    }
    else {

      return this.httpClient.post('/api/CustomerSMR/GetServiceDueVsDoneForVehicle', obj, {});
    }

  }

  getSMRConvertedCountDashboard(obj: any){
    if ((this.session.Country_Id === 15) || (this.session.RoleName === 'HOAdmin' && obj.Country_Id === 15)) {
      return this.httpClient.post('/api/CustomerSMR/GetSMRConvertedCountDashboardIndia2W', obj, {});
    }
    else {
      return this.httpClient.post('/api/CustomerSMR/GetSMRConvertedCountDashboard', obj, {});
    }
  }

  getServiceDue(obj: any) {
    if ((this.session.Country_Id === 15) || (this.session.RoleName === 'HOAdmin' && obj.Country_Id === 15)) {
      return this.httpClient.post('/api/CustomerSMR/GetServiceDueIndia2W', obj, {});
    }
    else {
      return this.httpClient.post('/api/CustomerSMR/GetServiceDue', obj, {});
    }
  }
  //inuse
  PSFServiceDashboard_bkCounters(obj: any) {
    return this.httpClient.post('/api/Dashboard_bk/PSFServiceDashboard_bkCounters', obj, {});
  }

  //inuse
  PSFSalesDashboard_bkCounters(obj: any) {
    return this.httpClient.post('/api/Dashboard_bk/PSFSalesDashboard_bkCounters', obj, {});
  }

  getDealerOutletList(id: number) {
    return this.httpClient.get('/api/Dealer/GetOutLetListForDDLByUser?UserId=' + id);
  }

  getOutLetListByCountry(id: number) {
    return this.httpClient.get('/api/Dealer/GetOutLetListByCountry?CountryId=' + id);
  }

  getTargetAchivement(obj: any) {
    return this.httpClient.post('/api/Customer/GetTargetAchivement', obj, {});
  }

  getMonthWiseTargetAchivementForIFC(obj: any) {
    return this.httpClient.post('/api/Customer/GetMonthWiseTargetAchivementForIFC', obj, {});
  }

  getMonthWiseTargetAchivementForService(obj: any) {
    return this.httpClient.post('/api/Customer/GetMonthWiseTargetAchivementForService', obj, {});
  }

  getMonthWiseTargetAchivementForSMR(obj: any) {
    return this.httpClient.post('/api/Customer/GetMonthWiseTargetAchivementForSMR', obj, {});
  }

  getMonthWiseTargetAchivementForEmail(obj: any) {
    return this.httpClient.post('/api/Customer/GetMonthWiseTargetAchivementForEmail', obj, {});
  }

  getMonthWiseTargetAchivementForPSF(obj: any) {
    return this.httpClient.post('/api/Customer/GetMonthWiseTargetAchivementForPSF', obj, {});
  }

  getCountryList() {
    return this.httpClient.get('/api/Country/GetCountryListForDDL');
  }

  getVehicleTypeForDDL() {
    return this.httpClient.get('/api/Company/GetVehicleTypeForDDL');
  }

  QuestionWiseTrend(obj: any) {
    return this.httpClient.post('/api/Customer/QuestionWiseTrend', obj, {});
  }

  getBrandTagForDDL():Observable<any>{
    return this.httpClient.get('/api/Company/GetBrandTagForDDL');
  }
  customerComplaintDashBoardCounters(obj:any){
    return this.httpClient.post('/api/Dashboard_bk/CustomerComplaintDashBoardCounters',obj, {});
  }

  getCustomerByVIN(id:string,uid:number){
    return this.httpClient.get('/api/Customer/GetCustomerForComplaint?VIN=' + id + '&UserId=' + uid);
  }

  getSAList(id:number){
    return this.httpClient.get('/api/Dealer/GetSAList?DealerId=' + id);
  }
  getTecnicianList(id:number){
    return this.httpClient.get('/api/Dealer/GetTecnicianList?DealerId=' + id);
  }

  getComplaintSource(){
    return this.httpClient.get('/api/Customer/GetComplaintSource');
  }
  saveResponse(obj:any){
    return this.httpClient.post('/api/Customer/CreateComplaint/', obj, {});
  }

  getServiceTypeList(id:number){
    return this.httpClient.get('/api/Dealer/GetServiceTypeListByVehicleForCC?VehicleId=' + id);
  }
  getVehicleList(id:number){
    return this.httpClient.get('/api/Company/GetVehicleListByCountry?CountryId=' + id);
  }

}
