import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../../../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(
    private http: HttpClient
  ) { }


 getVehicleTypeList(){
  return this.http.get(this.AppUrl +'/api/Company/GetVehicleTypeList');
 }

 getVehicleBrandList(){
  return this.http.get(this.AppUrl +'/api/Company/GetVehicleBrandList');
 }

 addVehicle(vehicle:Vehicle){
   return this.http.post(this.AppUrl +'/api/Company/AddVehicle/', vehicle, {});
 }

 uploadExcel(fd:FormData){
  return this.http.post(this.AppUrl +"/api/Company/PostData", fd, {});
 }

 deleteVehicle(vehicle:Vehicle){
  return this.http.post(this.AppUrl +'/api/Company/DeleteVehicle/', vehicle, {});
 }

 editVehicle(vehicle:Vehicle){
  return this.http.post(this.AppUrl +'/api/Company/EditVehicle/', vehicle, {});
 }
}