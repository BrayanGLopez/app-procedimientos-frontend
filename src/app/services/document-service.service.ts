import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentCreate } from '../models/document-create';
import { Codigo } from '../models/codigo';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  routeBase:string = "http://localhost:8080/document";

  constructor(
    private http:HttpClient
  ) { }

  public createDocument(documentCreate: DocumentCreate):Observable<any>{
    return this.http.post<any>(`${this.routeBase}`, documentCreate);
  }

  public saveDocument(formData:FormData):Observable<string>{
    return this.http.post<string>(`${this.routeBase}/save`, formData);
  }

  public getEndCodDocument():Observable<Codigo>{
    return this.http.get<Codigo>(`${this.routeBase}/end`);
  }

  public updateDocument(formData: FormData):Observable<any>{
    return this.http.put<any>(`${this.routeBase}`,formData);
  }

  public deleteDocument(id:number):Observable<any>{
    return this.http.delete(`${this.routeBase}/${id}`)
  }
}
