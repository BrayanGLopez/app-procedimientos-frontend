import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Userlogin } from 'src/app/models/userlogin';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  formlogin!:FormGroup;

  userLogin:Userlogin = {
    userName: '',
    password: ''
  }

  constructor(
    private loginService:LoginService,
    private router:Router,
    private formBilder:FormBuilder
  ){}

  ngOnInit(): void {
    this.formlogin = this.formBilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login():void{

    this.userLogin.userName = this.formlogin.value.username;
    this.userLogin.password = this.formlogin.value.password;

    this.loginService.login(this.userLogin).subscribe({
      next: (response) =>{
        localStorage.setItem('token', response);
        this.router.navigate(['/document/consult']);
      },
      error: (error:HttpErrorResponse) =>{
       console.log(error);
      }
    });
  }
}
