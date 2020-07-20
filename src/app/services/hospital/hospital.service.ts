import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { SubirArchivoService } from "../service.index";
import { URL_SERVICIOS } from "src/app/config/config";
import { map } from "rxjs/operators";
import { Hospital } from "src/app/models/hospital.model";
import swal from "sweetalert";

@Injectable({
  providedIn: "root",
})
export class HospitalService {
  baseUrl: string = URL_SERVICIOS;

  hospital: Hospital;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  cargarHospitales(desde: number = 0) {
    const url = this.baseUrl + '/hospital?desde=' + desde;

    return this.http.get(url);
  }

  buscarHospitales(termino: string) {
    const url = this.baseUrl + "/busqueda/coleccion/hospitales/" + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.hospitales));
  }

  crearHospital(hospital: Hospital) {
    return this.http.post(this.baseUrl + "/hospital", hospital).pipe(
      map((resp: any) => {
        swal("Hospital creado", hospital.nombre, "success");
        return resp.hospital;
      })
    );
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + "/hospital/" + hospital._id;
    url += "?token=" + this.token;

    console.log(url);

    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        swal("Hospital actualizado", hospital.nombre, "success");

        return true;
      })
    );
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + "/hospital/" + id;
    url += "?token=" + this.token;

    return this.http.delete(url).pipe(
      map((resp) => {
        swal(
          "Hospital borrado",
          "El hospital ha sido eliminado correctamente",
          "success"
        );
        return true;
      })
    );
  }
}
