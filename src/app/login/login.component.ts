import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;
  auth2: any;

  constructor(public router: Router,
              // tslint:disable-next-line: variable-name
              public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '19191691258-5ki9tho5hvdpqmjntimc8a1tu3ccnvao.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      const token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
      .subscribe(() => window.location.href = '#/dashboard'
      // this.router.navigate(['/dashboard']
      );

      console.log(token);

    });
  }

  ingresar( forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(
      null, forma.value.email, forma.value.password
    );

    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(resp => this.router.navigate(['/dashboard']));

    console.log(forma.valid);
    console.log(forma.value);
    // this.router.navigate(['/dashboard']);
     // 19191691258-uv21242vkka92mhle6rdn6kl1u5p57g7.apps.googleusercontent.com

  }

}
