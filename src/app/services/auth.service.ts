import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfor } from '../models/userInfor.model';
import { GeoFence } from '../auth/models/geoFence.model';
import { Login } from '../auth/models/login.model';
import { LogObj } from '../models/logObj.model';
import { SetPassword } from '../models/setPassword.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* appUrl = this.constant.AppUrl; */

  constructor(
   private httpClient:HttpClient
   ) { }
  
  authincateLogin(login:Login){
    return this.httpClient.get( '/api/Login/Login/?UserName=' + login.username + '&Password=' + login.password);
   };
    
   loginLog(data:any){
    return this.httpClient.post( '/api/Login/LoginLog/', data, {});
   };

   fortgotPassword(username:string){
    return this.httpClient.get('/api/Login/FortgotPassword/?UserName=' + username);
   };

   saveForm(data:SetPassword){
    return this.httpClient.post('/api/Login/FreshLogin/', data, {});
   }

    authenticateLoginWithCoordinates(geoFenceObj:GeoFence){
    return this.httpClient.get('/api/Login/LoginWithCoordinates/?UserName=' + geoFenceObj.username + '&Password=' + geoFenceObj.password + '&lat=' + geoFenceObj.lat + '&lan=' + geoFenceObj.lan);
   }

   changePassword(data:SetPassword){
    return this.httpClient.post('/api/Login/ChangePassword/', data, {});
   }

   CRELogOut(obj:LogObj) {
    return this.httpClient.post('/api/SMSReceiver/CRELogOut', obj, {});
   }
   
   logOut(data:UserInfor) {
    return this.httpClient.post('/api/Login/LogOut/', data, {});
  }
}
