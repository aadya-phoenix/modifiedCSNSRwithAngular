import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
 private customerSubject = new Subject<any>();
  constructor() { }
  sendCustomerEvent(obj:string){
     this.customerSubject.next(obj);
  }
  getCustomerEvent():Observable<any>{
   return this.customerSubject.asObservable();
  }
}
