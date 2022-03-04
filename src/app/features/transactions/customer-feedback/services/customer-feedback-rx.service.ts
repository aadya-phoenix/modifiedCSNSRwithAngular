import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerFeedbackRxService {

  public searchSubject =  new Subject<any>();

  constructor() { }

  sendEvent(obj:any){
    this.searchSubject.next(obj);
  }

  getEvent():Observable<any>{
    return this.searchSubject.asObservable();
  }

}
