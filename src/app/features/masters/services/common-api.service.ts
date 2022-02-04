import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dealer } from '../models/dealer.model';
import { DealerEmployee } from '../models/dealerEmployee.model';
import { Email } from '../models/email.model';
import { Level } from '../../../models/level.model';


@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

 // appUrl = this.constant.AppUrl;

  constructor(
    private http: HttpClient
  ) { }

  getSMSSetup(accountId: number) {
    return this.http.get('/api/Form/GetSMSSetup?CountryId=' + accountId);
  }

  configureSMSSetup(data: any) {
    return this.http.post('/api/Form/ConfigureSMSSetup/', data, {});
  }

  getEmailTemplate(accountId: number) {
    return this.http.get('/api/Country/GetEmailTemplate?CountryId=' + accountId);
  }

  updateEmailTemplate(data: Email) {
    return this.http.post('/api/Country/UpdateEmailTemplate/', data, {});
  }

  getLevel(id: number) {
    return this.http.get('/api/LevelMaster/GetLevel/?Country_id=' + id);
  }

  deleteLevel(data: Level) {
    return this.http.post('/api/LevelMaster/EditLevel/', data, {});
  }
  editLevel(data: Level) {
    return this.http.post('/api/LevelMaster/EditLevel/', data, {});
  }
  addLevel(data: Level) {
    return this.http.post('/api/LevelMaster/AddLevel/', data, {});
  }

  getSubLevel(Country_Id: number) {
    return this.http.get('/api/LevelDetail/GetLevel?Country_Id=' + Country_Id);
  }

  getLevelDetails(countryId: number, levelId: number) {
    return this.http.get('/api/LevelDetail/GetLevelDetail?Country_Id=' + countryId + '&Level_Id=' + levelId);
  }

  deleteLevelDetail(levelDetailId: number) {
    return this.http.get('/api/LevelDetail/DeleteLeveldetail?Leveldetail_Id=' + levelDetailId);
  }

  getTsmList(id:any){
    return this.http.post('/api/TsmMaster/GetTSM_OutLetList?Country_id=' + id,{});
  }

  getEmployeeBasedOnCountry(id:number){
    return this.http.get('/api/LevelWiseEmployee/GetEmployeeBasedOnCountry?Country_id=' + id);
  }

  getLevelTsm(id:number){
    return this.http.get('/api/Country/GetLevel?Country_Id=' + id);
  }

  getLevelDetailsDealer(id:number){
    return this.http.get('/api/Dealer/GetLevelDetails?Outlet_id=' + id);
  }

  deleteDistributor(data:Dealer) {
    return this.http.post('/api/TsmMaster/DeleteTsm/', data, {});
 }

 editDistributor(dealer:Dealer){
  return this.http.post('/api/TsmMaster/EditTsm/', dealer, {});
 }

 getDesignationList(){
  return this.http.get('/api/Dealer/GetDesignationList');
 }

 editEmployee(data:DealerEmployee){
  return this.http.post('/api/LevelWiseEmployee/EditEmployee/', data, {});
 }
 
 uploadExcelEmployee(fd:FormData) {
  return this.http.post("/api/LevelWiseEmployee/PostDataDealerEmployee", fd, {});
 }

 getDistributorList(){
  return this.http.get('/api/Distributor/GetDistributorList');
}
getState(id:number){
  return this.http.get('/api/Country/GetState?Country_Id=' + id);
 }

 getCity(id:number) {
  return this.http.get('/api/Country/GetCity?State_Id=' + id);
}
getDealerList(){
  return this.http.get('/api/Dealer/GetDealerList');
 }
 getVehicleList(){
  return this.http.get('/api/Company/GetVehicleList');
 }
}
