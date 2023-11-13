import { LoadingService } from './loading.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';




var pendingRequests=0;


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {



  token:any=localStorage.getItem('token')


  secret=environment.secret
  client=environment.client

  constructor(private loadingService:LoadingService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

this.loadingService.showLoading();
pendingRequests=pendingRequests+1;

      req = req.clone({
        setHeaders:{
          'Authorization' : `Bearer ${this.token}`
        },

       setParams:{
        'secret':this.secret,
        'client':this.client
       }
      })

    return next.handle(req).pipe(
      tap({
        next:(event)=>{
          if(event.type===HttpEventType.Response){
            this.handleHideLoading();
          }
        },
        error:(_)=>{
          this.handleHideLoading();
        }
      })
    );
  }
handleHideLoading(){
  pendingRequests=pendingRequests-1;
  if(pendingRequests===0)
  this.loadingService.hideLoading();
}
}
