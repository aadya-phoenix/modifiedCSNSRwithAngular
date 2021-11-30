import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private countrySubject = new Subject<any>();
  private toggleSubject = new Subject<any>();
  constructor() { }

  sendCountryEvent(obj:any):void{
    this.countrySubject.next(obj);
  }
  getCountryEvent():Observable<any>{
    return this.countrySubject.asObservable();
  }

  sendToggleEvent(obj:any):void{
    this.toggleSubject.next(obj);
  }

  getToggleEvent():Observable<any>{
    return this.toggleSubject.asObservable();
  }
}
