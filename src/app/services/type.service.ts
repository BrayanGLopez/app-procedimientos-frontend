import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  urlBase = 'http://localhost:8080/type';

  constructor(
    private http:HttpClient
  ) { }

  public getAllTypes():Observable<Type[]>{
    return this.http.get<Type[]>(this.urlBase);
  }
}
