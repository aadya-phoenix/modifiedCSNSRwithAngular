import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Distributor } from '../models/distributor.model';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(
    private http: HttpClient
  ) { }


  addDistributor(data:Distributor) {
    return this.http.post(this.AppUrl +'/api/Distributor/AddDistributor/', data, {});
   }

   uploadExcel(fd:FormData){
    return this.http.post(this.AppUrl +"/api/Distributor/PostData", fd, {});
   }

   deleteDistributor(data:Distributor) {
    return this.http.post(this.AppUrl +'/api/Distributor/DeleteDistributor/', data, {});
   }
   editDistributor(data:Distributor){
    return this.http.post(this.AppUrl +'/api/Distributor/EditDistributor/', data, {});
   }

}
