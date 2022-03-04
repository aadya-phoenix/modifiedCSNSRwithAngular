import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Outlet } from 'src/app/models/oultet.model';

@Injectable({
  providedIn: 'root'
})
export class DealerOutletMapService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(
    private http:HttpClient
  ) { }

  getDealerOutletList(userId:number) {
    return this.http.get(this.AppUrl +'/api/Dealer/GetOutLetListForDistributor?UserId=' + userId);
  }

  editOutlet(data:Outlet){
    return this.http.post(this.AppUrl +'/api/Dealer/EditOutletMapping/', data, {});
  }

}
