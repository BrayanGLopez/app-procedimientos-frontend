import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Userlogin } from '../models/userlogin';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../models/authresponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private rutaBase:string = 'http://localhost:8080';

  constructor(
    private http:HttpClient
  ) { }

  public login(creds:Userlogin):Observable<string>{
    localStorage.removeItem('token');
    return this.http.post<AuthResponse>(`${this.rutaBase}/auth/login`, creds)
    .pipe(map(response => {
      return response.token;
    }));
  }
  
  public getToken():string{
    return localStorage.getItem('token')!;
  }
}
