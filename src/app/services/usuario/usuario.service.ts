import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string = URL_SERVICIOS;

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient,
              public router: Router,
              public _subirArchivoService: SubirArchivoService) {

    this.cargarStorage();
    console.log('Servicio de usuario configurado!');

   }

   estaLogueado() {
    return (this.token.length > 5) ? true : false;
   }

   cargarStorage(){

    if(localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }

   }

    guardarStorage(id: string, token: string, usuario: Usuario) {
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      this.usuario = usuario;
      this.token = token;
    }

    logOut() {
      this.token = '';
      this.usuario = null;

      localStorage.removeItem('token');
      localStorage.removeItem('usuario');

      this.router.navigate(['/login2']);
    }

    loginGoogle(token: string) {
      return this.http.post(this.baseUrl + '/login/google', { token })
      .pipe(map((resp: any) => {
        console.log(resp);
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

   actualizarUsuario(usuario: Usuario){
     let url = URL_SERVICIOS + '/usuario/' + this.usuario._id;
     url += '?token=' + this.token;

     return this.http.put(url, usuario)
     .pipe(map((resp: any) => {

      const usuarioDB: Usuario = resp.usuario;

      this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
      swal('Usuario actualizado', usuario.nombre, 'success');

      return true;

     }));

   }

   cambiarImagen(archivo: File, id: string) {
      this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {

        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);

      })
      .catch(resp => {
        console.log(resp);
      });
   }

}
