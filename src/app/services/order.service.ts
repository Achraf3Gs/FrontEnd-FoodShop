import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) {}

    create(order:Order){
    return this.http.post<Order>(`${environment.urlBackend}`+'api/orders/create', order);
    }


   getNewOrderForCurrentUser(userId:number):Observable<Order>{
    return this.http.get<Order>(`${environment.urlBackend}`+'api/orders/newOrderForCurrentUser/'+userId);
   }

   pay(order:Order):Observable<string>{
    return this.http.post<string>(`${environment.urlBackend}`+'api/orders/pay',order);
  }

  trackOrderById(order_Id:number): Observable<Order>{
    return this.http.get<Order>(`${environment.urlBackend}`+'api/orders/track/' + order_Id);
  }

}
