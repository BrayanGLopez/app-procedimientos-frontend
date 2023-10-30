import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';
import {inject} from "@angular/core";

export const rolAdminGuard: CanActivateFn = (route, state) => {

  const jwtService = inject(JwtService);
  const router = inject(Router);
  const rol = jwtService.getClaim('Rol')[0].authority;

  if(rol === 'Administrador'){
    return true;
  }else{
    router.navigate(['/document/consult']);
    return false;
  }

};
