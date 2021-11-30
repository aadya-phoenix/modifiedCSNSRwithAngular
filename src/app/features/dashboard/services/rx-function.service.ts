import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxFunctionService {

  public toggleSubject =  new Subject<any>();
  private countrySubject = new Subject<any>();
  private countrySubject2 = new Subject<any>();

  constructor() { }

  sendToggleEvent(obj:any){
   this.toggleSubject.next(obj);
  }

  getToggleEvent():Observable<any>{
    return this.toggleSubject.asObservable();
  }

  sendChangeCountryEvent(obj:any){
  this.countrySubject.next(obj);
 // this.countrySubject2.next(obj);
  }

  getChangeCountryEvent(){
  return this.countrySubject.asObservable();
  } 
  getChangeCountryEvent2(){
    return this.countrySubject2.asObservable();
  }
}