import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsfRxService {

  currentViewSubject = new Subject<any>();
  openSmrSubject = new Subject<any>();

  sendCurrentView(obj:any){
    this.currentViewSubject.next(obj);
  }
  getCurrentView():Observable<any>{
    return this.currentViewSubject.asObservable();
  }

  sendSmrSubject(obj:any){
    this.openSmrSubject.next(obj);
  }
  SmrSubject():Observable<any>{
    return this.openSmrSubject.asObservable();
  }
}
