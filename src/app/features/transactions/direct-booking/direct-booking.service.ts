import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingInfo } from '../models/bookingInfo.model';

@Injectable({
  providedIn: 'root'
})
export class DirectBookingService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(private http:HttpClient) { }

  getServiceTypeList(id:number){
    return this.http.get(this.AppUrl +'/api/Dealer/GetServiceTypeListByVehicle?VehicleId=' + id);
  }
  saveResponse(obj:BookingInfo) {
    return this.http.post(this.AppUrl +'/api/Customer/CreateDirectBooking/', obj, {});
  }
}
