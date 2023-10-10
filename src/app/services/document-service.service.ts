import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentCreate } from '../models/document-create';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  routeBase:string = "http://localhost:8080/pruebas/document";

  constructor(
    private http:HttpClient
  ) { }

  public createDocument(documentCreate: DocumentCreate):Observable<any>{
    return this.http.post<any>(`${this.routeBase}`, documentCreate);
  }

  public saveDocument(formData:FormData):Observable<string>{
    return this.http.post<string>(`${this.routeBase}/save`, formData);
  }

}
