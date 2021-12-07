import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
 private customerSubject = new Subject<any>();
  constructor() { }
  sendCustomerEvent(){
     this.customerSubject.next();
  }
  getCustomerEvent():Observable<any>{
   return this.customerSubject.asObservable();
  }
}
