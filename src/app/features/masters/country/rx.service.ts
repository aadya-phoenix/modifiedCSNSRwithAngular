import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxService {

  public toggleSubject =  new Subject<any>();

  sendToggleEvent(){
    this.toggleSubject.next();
   }
 
   getToggleEvent():Observable<any>{
     return this.toggleSubject.asObservable();
   }

  constructor() { }
}
