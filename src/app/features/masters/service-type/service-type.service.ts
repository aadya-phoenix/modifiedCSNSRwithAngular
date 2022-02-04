import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceType } from './serviceType.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  //appUrl = this.constant.AppUrl;

  constructor(
    private http: HttpClient
  ){}

  getServiceType(){
    return this.http.get('/api/Company/GetServiceType');
   }

  addServiceType(data:ServiceType){
    return this.http.post('/api/Company/AddServiceType/', data, {});
   }

   uploadExcel(fd:FormData){
    return this.http.post("/api/Company/UploadServiceType", fd, {});
   }
   deleteServiceType(pt:ServiceType){
    return this.http.post('/api/Company/DeleteServiceType/', pt, {});
   }
   editServiceType(data:ServiceType){
    return this.http.post('/api/Company/EditServiceType/', data, {});
   }
}
