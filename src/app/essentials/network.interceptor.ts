import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../loading-spinner/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

   totalRequests = 0;
   completedRequests = 0;

  constructor(private loader:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    this.loader.show();
    this.totalRequests++;

    return next.handle(request).pipe(
      finalize(()=>{

        this.completedRequests++;

        if(this.completedRequests == this.totalRequests){
        this. loader.hide();
        this.completedRequests = 0;
        this.totalRequests = 0;
        }
      })
    );
  }
}