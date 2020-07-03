import { Component, OnInit } from "@angular/core";
import { ModalUploadService } from "src/app/components/modal-upload/modal-upload.service";
import { HospitalService } from "src/app/services/service.index";
import { Hospital } from "src/app/models/hospital.model";

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
  styleUrls: ["./hospitales.component.css"],
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {
    this.cargarHospitales();
  }

  ngOnInit(): void {}

  cargarHospitales() {
    this.cargando = true;

    this._hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService
      .buscarUsuarios(termino)
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        this.cargando = false;
        console.log(this.hospitales);
      });
  }

}
