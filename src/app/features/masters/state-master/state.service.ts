import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  AppUrl ="https://demo2.suzuki-feedback.com";

  constructor(
    private http: HttpClient
  ) { }

  getCountryList() {
    return this.http.get(this.AppUrl +'/api/Country/GetCountryList');
  }

  addState(data:State){
    return  this.http.post(this.AppUrl +'/api/Country/AddState/', data, {});
 }

  uploadState(fd:FormData) {
  return this.http.post(this.AppUrl +"/api/Country/UploadSate", fd, {});
  }

  deleteState(data:State) {
    return this.http.post(this.AppUrl +'/api/Country/DeleteState/', data, {});
  }

  editState(data:State){
    return this.http.post(this.AppUrl +'/api/Country/EditState/', data, {});
  }
}
