import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard  {

  constructor(
    private loginService:LoginService,
    private router:Router
  ){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!this.loginService.getToken()){
      return true;
    }

    this.router.navigate(['/document/consult']);
    return false;
  }
  
}
