import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxDisService {

  public searchSubject = new Subject<any>();

  constructor() { }

  sendEvent(obj:any){
    this.searchSubject.next(obj);
  }

  getEvent():Observable<any>{
   return this.searchSubject.asObservable()
  }
}
