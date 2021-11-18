import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeoFence } from '../models/geoFence.model';
import { Login } from '../models/login.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private httpClient:HttpClient) { }
  appUrl="http://localhost:52268/api/";

  authincateLogin(login:Login){
    return this.httpClient.get( this.appUrl + 'Login/Login/?UserName=' + login.username + '&Password=' + login.password);
   };
    
   loginLog(data:any){
    return this.httpClient.post( this.appUrl + 'Login/LoginLog/', data, {});
   };

   fortgotPassword(username:string){
    return this.httpClient.get( this.appUrl + 'Login/FortgotPassword/?UserName=' + username);
   };

   saveForm(data:any){
    return this.httpClient.post( this.appUrl + 'Login/FreshLogin/', data, {});
   }

   authenticateLoginWithCoordinates(geoFenceObj:GeoFence){
  return this.httpClient.get( this.appUrl + 'Login/LoginWithCoordinates/?UserName=' + geoFenceObj.username + '&Password=' + geoFenceObj.password + '&lat=' + geoFenceObj.lat + '&lan=' + geoFenceObj.lan);
   }
}
