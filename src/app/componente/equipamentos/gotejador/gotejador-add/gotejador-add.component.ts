import { Router, ActivatedRoute } from '@angular/router';
import { Gotejador } from './../../../../model/Gotejador';
import { Component, OnInit } from '@angular/core';
import { GotejadorService } from 'src/app/service/gotejador.service';

@Component({
  selector: 'app-gotejador-add',
  templateUrl: './gotejador-add.component.html',
  styleUrls: ['./gotejador-add.component.css']
})
export class GotejadorAddComponent implements OnInit {

  gotejador = new Gotejador();

  constructor(
    private router: Router,
    private routeActive: ActivatedRoute,
    private gotejadorService: GotejadorService
  ) { }

  ngOnInit(): void {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.gotejadorService.getGotejador(id).subscribe(data => {
        this.gotejador = data;
      });
    }
  }

  novo() {
    this.gotejador = new Gotejador();
  }

  salvarGotejador() {
    if (this.gotejador.idGotejador != null && this.gotejador.idGotejador.toString().trim() != null) { /* Atualizando ou Editando*/
      this.gotejadorService.updateGotejador(this.gotejador).subscribe(data => {
        this.novo();
        this.router.navigate(['gotejadorList']);
        console.info("Gotejador Atualizado: " + data);
      });
    } else {
      this.gotejador.idFazenda = 1;
      this.gotejadorService.salvarGotejador(this.gotejador).subscribe(data => { /*Salvando um novo User */
        this.novo();
        this.router.navigate(['gotejadorList']);
        console.info("Gravou Gotejador: " + data);
      });
    }
  }

}
