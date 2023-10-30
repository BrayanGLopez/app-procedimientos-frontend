import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentCreate } from 'src/app/models/document-create';
import { Engineer } from 'src/app/models/engineer';
import { Type } from 'src/app/models/type';
import { DocumentService } from 'src/app/services/document-service.service';
import { EngineerService } from 'src/app/services/engineer.service';
import { TypeService } from 'src/app/services/type.service';

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
  ultimoCod!:string;

  constructor(
    private documentService:DocumentService,
    private formBuilder:FormBuilder,
    private router:Router,
    private typeService:TypeService,
    private engineerService:EngineerService
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

    this.formData = new FormData();

    this.documentService.getEndCodDocument().subscribe({
      next: response => this.ultimoCod = `Ultimo registrado ${response.cod}`,
      error: error => console.error( error)
    });

    this.typeService.getAllTypes().subscribe({
      next: respose => this.types = respose,
      error: error => console.log(error) 
    });

    this.engineerService.getAllEngineers().subscribe({
      next: response => this.engineers = response,
      error: error => console.error(error)
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
          next: response => this.router.navigate(['/consult']),
          error: error => console.log('error ->', error)
        }); 
      },
      error: (error) => { console.log(error) }
    });
  }

}
