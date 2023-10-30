import { CanActivateFn, Router } from '@angular/router';
import {inject} from "@angular/core";
import { JwtService } from '../services/jwt.service';

export const rolIngGuard: CanActivateFn = (route, state) => {

  const jwtService = inject(JwtService);
  const router = inject(Router);
  const rol = jwtService.getClaim('Rol')[0].authority;

  if(rol === 'Ingeniero' || rol === 'Administrador'){
    return true;
  }else{
    router.navigate(['/document/consult']);
    return false;
  }
};
