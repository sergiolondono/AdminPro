import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../service.index';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  baseUrl: string = URL_SERVICIOS;

  constructor(public http: HttpClient,
              public router: Router,
              public _subirArchivoService: SubirArchivoService) { }

  cargarHospitales() {
    const url = this.baseUrl + '/hospital';

    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = this.baseUrl + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.hospitales));
  }

}
