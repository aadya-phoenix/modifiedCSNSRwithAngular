import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DealerLi } from './dealerLi.model';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  AppUrl ="https://demo2.suzuki-feedback.com";
  
  constructor(
    private http: HttpClient
    ){}

 

   addDealer(fd:FormData){
    return this.http.post(this.AppUrl +'/api/Dealer/AddDealer/', fd, {});
   }

   uploadExcel(fd:FormData){
    return this.http.post(this.AppUrl +"/api/Dealer/PostData", fd, {});
   }

   editDealer(fd:FormData){
    return this.http.post(this.AppUrl +'/api/Dealer/EditDealer/', fd, {});
   } 

   deleteDealer(data:DealerLi){
    return this.http.post(this.AppUrl +'/api/Dealer/DeleteDealer/', data, {});
   }
}
