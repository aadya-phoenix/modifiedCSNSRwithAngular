import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Outlet } from 'src/app/models/oultet.model';


@Injectable({
  providedIn: 'root'
})
export class DealerOutletService {

  AppUrl ="https://demo2.suzuki-feedback.com";
  
  constructor(
    private http: HttpClient
    ){}


  getDealerOutletList() {
    return this.http.get(this.AppUrl +'/api/Dealer/GetOutletList');
  }

 addOutlet(data:Outlet){
  return this.http.post(this.AppUrl +'/api/Dealer/AddOutlet/', data, {});
 }

 uploadExcel(fd:FormData){
  return this.http.post(this.AppUrl +"/api/Dealer/PostDataDealerOutlet", fd, {});
 }

 editOutlet(data:Outlet){
  return this.http.post(this.AppUrl +'/api/Dealer/EditOutlet/', data, {});
 }

 deleteOutlet(data:Outlet) {
  return this.http.post(this.AppUrl +'/api/Dealer/DeleteOutlet/', data, {});
 }
}
