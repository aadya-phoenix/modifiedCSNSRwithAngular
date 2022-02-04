import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private http: HttpClient
  ) { }

  getCountryList() {
    return this.http.get('/api/Country/GetCountryList');
  }

  addState(data:State){
    return  this.http.post('/api/Country/AddState/', data, {});
 }

  uploadState(fd:FormData) {
  return this.http.post("/api/Country/UploadSate", fd, {});
  }

  deleteState(data:State) {
    return this.http.post('/api/Country/DeleteState/', data, {});
  }

  editState(data:State){
    return this.http.post('/api/Country/EditState/', data, {});
  }
}
