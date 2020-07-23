import { Injectable } from '@angular/core';
import { CanActivate, Router, Route} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public router: Router,
    public _usuarioService: UsuarioService) { }

  canActivate() {
    if (this._usuarioService.estaLogueado()) {
      return true;
    } else {
      console.log('Bloqueado por el Guard');
      this.router.navigate(['/login2']);
      return false;
    }
  }

}
