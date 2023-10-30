import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientProduct } from 'src/app/models/client-product';
import { DocumentProduct } from 'src/app/models/document-product';
import { ProductClient } from 'src/app/models/product-client';
import { ClientService } from 'src/app/services/client.service';
import { DocumentService } from 'src/app/services/document-service.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit{

  formDelete!:FormGroup;
  clientsProducts!:ClientProduct[];
  clientProduct!:ClientProduct | null;
  productClient!:ProductClient | null;
  document!:DocumentProduct | null;

  constructor(
    private documentService:DocumentService,
    private clientService:ClientService,
    private formBuilder:FormBuilder
  ){}

  ngOnInit(): void {
    this.formDelete = this.formBuilder.group({
      client: [null, Validators.required],
      product: [null, Validators.required],
      document: [null, Validators.required]
    });

    this.clientService.getAllClients().subscribe({
      next: response => this.clientsProducts = response,
      error: error => console.error(error)
    });
  }

  public listProduct():void{
    this.formDelete.get('product')?.setValue(null);
    this.productClient = null;
    this.document = null;
    this.clientProduct = this.formDelete.get('client')?.value;
  }

  public listDocuments():void{
    this.productClient = this.formDelete.get('product')?.value;
  }

  public deleteDocument(id:number):void{
    this.documentService.deleteDocument(id).subscribe({
      next: response => {
        this.formDelete.reset();
        this.productClient = null;
        this.clientProduct = null;
        this.document = null;
        this.ngOnInit();
      },
      error: error => console.error(error)
    });
  }

}
