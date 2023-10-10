import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {

  constructor(
    private router:Router
  ){}

  exit():void{
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
