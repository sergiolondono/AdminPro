import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { retry, map, filter } from "rxjs/operators";
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresarObservable()
    .subscribe(
      numero => console.log('Subscribe: ', numero),
      error => console.error('Error en el observer', error),
      () => console.log('El observador terminó!')
    );

  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('La página Rxjs se va a cerrar!');
  }

  regresarObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Auxilio');
        // }

      }, 1000);
    }).pipe(

      map(resp => resp.valor),
      filter((valor, index) => {

        if((valor % 2) === 1) {
          return true;
        } else {
          return false;
        }

      })

    );
  }

}
