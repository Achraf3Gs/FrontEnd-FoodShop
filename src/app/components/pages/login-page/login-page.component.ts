import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthuserService } from 'src/app/services/authuser.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  helper = new JwtHelperService()


  dataRecieved:any
  loginForm!:FormGroup;
  isSubmitted=false;
  returnUrl='';
  constructor(private formBuilder:FormBuilder,
    private authuserService:AuthuserService,
    private activatedRoute:ActivatedRoute,
    private router:Router){}

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
    });
    this.returnUrl= this.activatedRoute.snapshot.queryParams.returnUrl;
  }
//loginForm.controls.email
//fc.email

get fc(){
  return this.loginForm.controls;
}

submit(){
  this.isSubmitted=true;
  if(this.loginForm.invalid) return;

  this.authuserService.login({email:this.fc.email.value,
     password:this.fc.password.value}).subscribe((response)=>{

      this.dataRecieved=response
      console.log(this.dataRecieved);
      
      this.authuserService.saveDataProfil(this.dataRecieved.token);
      this.router.navigateByUrl(this.returnUrl);

     })
}






}
