import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientProduct } from '../models/client-product';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  routeBase:string = "http://localhost:8080/pruebas/client";

  constructor(
    private http:HttpClient
  ) { }

  public getAllClients():Observable<ClientProduct[]>{
    return this.http.get<ClientProduct[]>(`${this.routeBase}`);
  }
}
