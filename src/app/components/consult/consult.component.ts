import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientProduct } from 'src/app/models/client-product';
import { DocumentProduct } from 'src/app/models/document-product';
import { ProductClient } from 'src/app/models/product-client';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit{

  clientsProducts!:ClientProduct[];
  clientProduct!:ClientProduct;
  productClient!:ProductClient | null;
  urldocument!:string | null;

  formSerch!:FormGroup;

  constructor(
    private clientService:ClientService,
    private formBuilder:FormBuilder,
    private router:Router
  ){}


  ngOnInit(): void {

    this.formSerch = this.formBuilder.group({
      client: [null],
      product: [null]
    });

    this.clientService.getAllClients().subscribe({
      next: (response) =>{
        this.clientsProducts = response;
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }

  public listProducts():void{
    this.formSerch.get('product')?.setValue(null);
    this.productClient = null;
    this.urldocument = null;
    this.clientProduct = this.formSerch.get('client')?.value;    
  }

  public listDocuments():void{
    this.urldocument = null;
    this.productClient = this.formSerch.get('product')?.value;
  }

  public viewDocument(document:DocumentProduct):void{
    this.urldocument = `http://localhost:8080/document/load/${document.idDocument}`;
  }
}
