import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Engineer } from '../models/engineer';

@Injectable({
  providedIn: 'root'
})
export class EngineerService {

  urlBase = 'http://localhost:8080/engineer';

  constructor(
    private http:HttpClient
  ) { }

  public getAllEngineers():Observable<Engineer[]>{
    return this.http.get<Engineer[]>(this.urlBase);
  }
}
