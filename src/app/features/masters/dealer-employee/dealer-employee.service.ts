import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DealerEmployee } from '../../../models/dealerEmployee.model';

@Injectable({
  providedIn: 'root'
})
export class DealerEmployeeService {

  AppUrl ="https://demo2.suzuki-feedback.com";
  
  constructor(private http:HttpClient) { }

  getEmployeeBasedOnDealer(id:number){
    return this.http.get(this.AppUrl +'/api/Dealer/GetEmployeeBasedOnDealer?UserID=' + id);
  }

  getDealerOutletList(){
    return this.http.get(this.AppUrl +'/api/Dealer/GetOutletList');
  }

  addEmployee(data:DealerEmployee) {
    return this.http.post(this.AppUrl +'/api/Dealer/AddEmployee/', data, {});
 }

 editEmployee(data:DealerEmployee) {
  return this.http.post(this.AppUrl +'/api/Dealer/EditEmployee/', data, {});
 }

 uploadExcel(fd:FormData) {
  return this.http.post(this.AppUrl +"/api/Dealer/PostDataDealerEmployee", fd, {});
 }
}
