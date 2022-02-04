import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DealerLi } from './dealerLi.model';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

 // appUrl = this.constant.AppUrl;
  
  constructor(
    private http: HttpClient
    ){}

 

   addDealer(fd:FormData){
    return this.http.post('/api/Dealer/AddDealer/', fd, {});
   }

   uploadExcel(fd:FormData){
    return this.http.post("/api/Dealer/PostData", fd, {});
   }

   editDealer(fd:FormData){
    return this.http.post('/api/Dealer/EditDealer/', fd, {});
   } 

   deleteDealer(data:DealerLi){
    return this.http.post('/api/Dealer/DeleteDealer/', data, {});
   }
}
