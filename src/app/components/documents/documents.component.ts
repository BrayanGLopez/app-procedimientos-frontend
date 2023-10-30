import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit{

  rol!:any;

  constructor(
    private router:Router,
    private jwtService:JwtService
  ){}

  ngOnInit(): void {
    this.rol = this.jwtService.getClaim('Rol')[0].authority;
  }

  exit():void{
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
