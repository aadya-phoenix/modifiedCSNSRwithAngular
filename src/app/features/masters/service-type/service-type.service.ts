import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceType } from '../../../models/serviceType.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(
    private http: HttpClient
  ){}

  getServiceType(){
    return this.http.get(this.AppUrl +'/api/Company/GetServiceType');
   }

  addServiceType(data:ServiceType){
    return this.http.post(this.AppUrl +'/api/Company/AddServiceType/', data, {});
   }

   uploadExcel(fd:FormData){
    return this.http.post(this.AppUrl +"/api/Company/UploadServiceType", fd, {});
   }
   deleteServiceType(pt:ServiceType){
    return this.http.post(this.AppUrl +'/api/Company/DeleteServiceType/', pt, {});
   }
   editServiceType(data:ServiceType){
    return this.http.post(this.AppUrl +'/api/Company/EditServiceType/', data, {});
   }
}
