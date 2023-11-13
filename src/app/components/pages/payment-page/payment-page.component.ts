import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent  implements OnInit{

  token:any=localStorage.getItem('token')
  helper = new JwtHelperService()
  getUserId(){
    let token:any=localStorage.getItem('token')
    let decodeToken=this.helper.decodeToken(token)
    return decodeToken.id
  }

  order:Order= new Order();
  constructor(orderService:OrderService, router:Router){
    let userId=this.getUserId();
   orderService.getNewOrderForCurrentUser(userId).subscribe({
    next:(order)=>{
      this.order=order;
    },
    error:()=>{
     router.navigateByUrl('/checkout');
    }
   })
  }
  ngOnInit(): void {

  }

}
