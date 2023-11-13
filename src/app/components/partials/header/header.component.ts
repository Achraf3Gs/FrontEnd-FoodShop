import { AuthuserService } from 'src/app/services/authuser.service';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HederComponent implements OnInit {


  cartQuantity=0
  user!:User;
constructor(cartService:CartService, private authuserService:AuthuserService){
cartService.getCartObservable().subscribe((newCart)=>{
  this.cartQuantity= newCart.totalCount
})

authuserService.userObservable.subscribe((newUser)=>{
  this.user=newUser;
})

}


  ngOnInit(): void {

  }

logout(){
  this.authuserService.logout();
}
get isAuth(){
  return this.user.token;
}
}
