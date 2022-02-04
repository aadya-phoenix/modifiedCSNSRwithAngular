import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  //appUrl = this.constant.AppUrl;

  constructor(
    private http: HttpClient
  ) { }


 getVehicleTypeList(){
  return this.http.get('/api/Company/GetVehicleTypeList');
 }

 getVehicleBrandList(){
  return this.http.get('/api/Company/GetVehicleBrandList');
 }

 addVehicle(vehicle:Vehicle){
   return this.http.post('/api/Company/AddVehicle/', vehicle, {});
 }

 uploadExcel(fd:FormData){
  return this.http.post("/api/Company/PostData", fd, {});
 }

 deleteVehicle(vehicle:Vehicle){
  return this.http.post('/api/Company/DeleteVehicle/', vehicle, {});
 }

 editVehicle(vehicle:Vehicle){
  return this.http.post('/api/Company/EditVehicle/', vehicle, {});
 }
}