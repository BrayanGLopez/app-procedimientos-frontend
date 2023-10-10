import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentCreate } from 'src/app/models/document-create';
import { Engineer } from 'src/app/models/engineer';
import { Type } from 'src/app/models/type';
import { DocumentService } from 'src/app/services/document-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  documentCreate!:DocumentCreate;
  types!:Type[]; 
  engineers!:Engineer[];
  formCreateDocument!:FormGroup;
  formData!:FormData;

  constructor(
    private documentService:DocumentService,
    private formBuilder:FormBuilder
  ){}

  ngOnInit(): void {
    this.formCreateDocument = this.formBuilder.group({
      codigoDocument: ['', Validators.required],
      idClient: [, Validators.required],
      nameClient: ['', Validators.required],
      idProduct: [, Validators.required],
      nameProduct: ['', Validators.required],
      type: [null, Validators.required],
      engineer: [null, Validators.required],
      document: [null, Validators.required]
    });

    this.formData = new FormData()
    this.types = [];
    this.engineers = [];

    this.types.push({
      idType: 1,
      nameType: "Doc"
    });

    this.engineers.push({
      idEngineer: 1,
      nameEngineer: "Brayan Lopez"
    });
  }

  registerFile(event: Event): void{

    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);

    if (file) { 
      this.formData.append('file', file);
    }
  }
    
  create():void{

    const type:Type = this.formCreateDocument.get('type')?.value;

    this.documentCreate = {
      codigoDocument: this.formCreateDocument.get('codigoDocument')?.value,
      urlDocument:"",
      product: {
        idProduct: this.formCreateDocument.get('idProduct')?.value,
        nameProduct: this.formCreateDocument.get('nameProduct')?.value,
        client: {
          idClient: this.formCreateDocument.get('idClient')?.value,
          nameClient: this.formCreateDocument.get('nameClient')?.value
        }
      },
      type: this.formCreateDocument.get('type')?.value,
      engineer:this.formCreateDocument.get('engineer')?.value 
    }

    this.formData.append('nameClient', this.formCreateDocument.get('nameClient')?.value);
    this.formData.append('nameProduct', this.formCreateDocument.get('nameProduct')?.value);
    this.formData.append('nameType', type.nameType);

    this.documentService.createDocument(this.documentCreate).subscribe({
      next: (response) => { 
        this.formCreateDocument.reset();
        this.documentService.saveDocument(this.formData).subscribe({
          next: (response) => {
            
            console.log('ok ->', response)
          },
          error: (error) => {
            console.log('error ->', error)
          }
        }); 
      },
      error: (error) => { console.log(error) }
    });
  }

}
