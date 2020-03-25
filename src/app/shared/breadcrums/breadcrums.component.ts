import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  titulo: string;
  descripcion : string;

  constructor(private router: Router, 
              private title: Title,
              private meta: Meta) { 

    this.getDataRoute()
    .subscribe(data => {
      console.log(data);
      this.titulo = data.titulo;
      this.descripcion = data.description;

      this.title.setTitle(this.titulo);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.descripcion
      };

      this.meta.updateTag(metaTag);

    });

  }

  ngOnInit(): void {
  }

  getDataRoute() {
    return this.router.events.pipe(

      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)

    );
  }

}
