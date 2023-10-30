import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientProduct } from 'src/app/models/client-product';
import { DocumentProduct } from 'src/app/models/document-product';
import { ProductClient } from 'src/app/models/product-client';
import { ClientService } from 'src/app/services/client.service';
import { DocumentService } from 'src/app/services/document-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit{

  formUpdate!:FormGroup;
  formData!:FormData;
  clientProduct!:ClientProduct | null;
  producClient!:ProductClient | null;
  document!:DocumentProduct | null;
  clientsProducts!:ClientProduct[];
  exitsFile:boolean = false;

  constructor(
    private formBuilder:FormBuilder,
    private clientService:ClientService,
    private documentService:DocumentService
  ){}

  ngOnInit(): void {
    this.formData = new FormData();
    this.formUpdate = this.formBuilder.group({
      client: [null, Validators.required],
      product: [null, Validators.required],
      document: [null, Validators.required],
      newFile: [null, Validators.required]
    });

    this.clientService.getAllClients().subscribe({
      next: response => this.clientsProducts = response,
      error: error => console.error(error)
    });
  }

  listProduct():void{
    this.formUpdate.get('product')?.setValue(null);
    this.producClient = null;
    this.document = null;
    this.clientProduct = this.formUpdate.get('client')?.value;
  }

  listDocuments():void{
    this.producClient = this.formUpdate.get('product')?.value;
  }

  selectDocument():void{
    this.document = this.formUpdate.get('document')?.value;
  }

  updateFile(event:Event):void{    
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);

    if (file) { 
      this.formData.append('file', file);
      this.exitsFile = true;
    }
  }

  updateDocument():void{
    this.formData.append('idDocument', this.document!.idDocument.toString());

    this.documentService.updateDocument(this.formData).subscribe({
      next: response => {
        this.formUpdate.reset();
        this.clientProduct = null;
        this.producClient = null;
        this.document = null;
        this.ngOnInit();
      },
      error: error => console.error(error)
    });
  }

}
