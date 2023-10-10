import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { ConsultComponent } from './components/consult/consult.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateComponent } from './components/update/update.component';
import { DeleteComponent } from './components/delete/delete.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'document', component: DocumentsComponent, canActivate: [LoginGuard],
    children: [
      { path: 'consult', component: ConsultComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'update', component: UpdateComponent },
      { path: 'delete', component: DeleteComponent},
      { path: '**', pathMatch: 'full', redirectTo: ''}
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
