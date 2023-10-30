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
import { IsLoggedGuard } from './guards/is-logged.guard';
import { rolAdminGuard } from './guards/rol-admin.guard';
import { rolIngGuard } from './guards/rol-ing.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [IsLoggedGuard]},
  { path: 'document', component: DocumentsComponent, canActivate: [LoginGuard],
    children: [
      { path: 'consult', component: ConsultComponent },
      { path: 'register', component: RegisterComponent, canActivate: [rolIngGuard] },
      { path: 'update', component: UpdateComponent, canActivate: [rolIngGuard] },
      { path: 'delete', component: DeleteComponent, canActivate: [rolAdminGuard]},
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
