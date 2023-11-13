import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/intefaces/IUserLogin';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ToastrService } from 'ngx-toastr';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import { IUserRegister } from '../shared/intefaces/IuserRegister';

const USER_KEY='User'
@Injectable({
  providedIn: 'root'
})
export class AuthuserService {

  profilAdmin={
    name:'',
    role:''
   }
  helper = new JwtHelperService()

private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
public userObservable:Observable<User>;

  constructor(private http:HttpClient, private toastrService:ToastrService, private route:Router) {
  this.userObservable= this.userSubject.asObservable();
  }

public  get currentUser():User{
  return this.userSubject.value;
}

  login(userLogin:IUserLogin):Observable<User>{

     return this.http.post<User>('http://localhost:8080/api/v1/auth/authenticate',userLogin).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
           this.userSubject.next(user);
           this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
             'Login Successful'
           )
           console.log(user);
        },
        error:(errorResponse)=>{
          this.toastrService.error(errorResponse.error, 'Login Failed')
        }
      })
     )
  }

  register(userRegister:IUserRegister):Observable<User>{

    return this.http.post<User>('http://localhost:8080/api/v1/auth/register',userRegister).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
           this.userSubject.next(user);
           this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
             'Register Successful'
           )
           console.log(user);
        },
        error:(errorResponse)=>{
          this.toastrService.error(errorResponse.error, 'Register Failed')
        }
      })
     )
  }

  logout(){
    this.userSubject.next(new User());
     localStorage.removeItem(USER_KEY);
     localStorage.removeItem('token');
     localStorage.removeItem('Cart');
     this.route.navigate(['/login'])


  }

  saveDataProfil(token:any){
    let decodeToken=this.helper.decodeToken(token)

    localStorage.setItem('token',token)



    console.log(decodeToken);
    }
    private setUserToLocalStorage(user:User){
      localStorage.setItem(USER_KEY, JSON.stringify(user))
      }

    getUserFromLocalStorage():User{
      const userJson= localStorage.getItem(USER_KEY);
      if(userJson)return JSON.parse(userJson) as User;
      return new User();
    }

    loggedIn(){
      let token:any=localStorage.getItem('token')

      if(!token){return false}


      if(this.helper.isTokenExpired(token)){return false}

    return true
    }


}
