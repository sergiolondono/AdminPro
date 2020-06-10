import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

usuarios: Usuario[] = [];
desde: number = 0;
totalRegistros: number = 0;
cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
    .subscribe((resp: any) => {

      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;

    });
  }

  cambiarDesde(valor: number) {

    const desde = this.desde + valor;
    console.log();

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario(termino: string) {

    if (termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino)
    .subscribe((usuarios: Usuario[]) => {

      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

}
