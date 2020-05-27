import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string = URL_SERVICIOS;

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient) {
    console.log('Servicio de usuario configurado!');
   }

    guardarStorage(id: string, token: string, usuario: Usuario) {
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      this.usuario = usuario;
      this.token = token;
    }

    loginGoogle(token: string) {
      return this.http.post(this.baseUrl + '/login/google', { token })
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
      }));
    }

   login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(this.baseUrl + '/login', usuario)
    .pipe(map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    }));
   }

   crearUsuario(usuario: Usuario) {

    return this.http.post(this.baseUrl + '/usuario', usuario)
    .pipe(map((resp: any) => {
      swal('Usuario creado', usuario.email, 'success');
      return resp.usuario;
    }));
   }

}
