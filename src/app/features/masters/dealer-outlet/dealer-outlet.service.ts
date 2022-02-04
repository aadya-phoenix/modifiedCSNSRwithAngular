import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Outlet } from 'src/app/models/oultet.model';


@Injectable({
  providedIn: 'root'
})
export class DealerOutletService {

  //appUrl = this.constant.AppUrl;
  
  constructor(
    private http: HttpClient
    ){}


  getDealerOutletList() {
    return this.http.get('/api/Dealer/GetOutletList');
  }

getOutletTypeList(){
  return this.http.get('/api/Dealer/GetOutletTypeList');
 }

 addOutlet(data:Outlet){
  return this.http.post('/api/Dealer/AddOutlet/', data, {});
 }

 uploadExcel(fd:FormData){
  return this.http.post("/api/Dealer/PostDataDealerOutlet", fd, {});
 }

 editOutlet(data:Outlet){
  return this.http.post('/api/Dealer/EditOutlet/', data, {});
 }

 deleteOutlet(data:Outlet) {
  return this.http.post('/api/Dealer/DeleteOutlet/', data, {});
 }
}
