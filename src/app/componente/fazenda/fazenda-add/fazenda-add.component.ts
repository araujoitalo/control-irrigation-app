import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Fazenda } from 'src/app/model/Fazenda';
import { FazendaService } from 'src/app/service/fazenda.service';

@Component({
  selector: 'app-fazenda-add',
  templateUrl: './fazenda-add.component.html',
  styleUrls: ['./fazenda-add.component.css']
})
export class FazendaAddComponent implements OnInit {

  fazenda = new Fazenda();

  constructor(
    private router: Router,
    private routeActive: ActivatedRoute,
    private fazendaService: FazendaService
  ) { }

  ngOnInit(): void {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.fazendaService.getFazenda(id).subscribe(data => {
        this.fazenda = data;
      });
    }
  }

  novo() {
    this.fazenda = new Fazenda();
  }

  salvarFazenda() {
    if (this.fazenda.idFazenda != null && this.fazenda.idFazenda.toString().trim() != null) { /* Atualizando ou Editando*/
      this.fazendaService.updateFazenda(this.fazenda).subscribe(data => {
        this.novo();
        this.router.navigate(['fazendaList']);
        console.info("Fazenda Atualizado: " + data);
      });
    } else {
      let idUsuario:Number =+ JSON.parse(localStorage.getItem('idUsuario'));
      this.fazenda.idUsuario = idUsuario;
      this.fazendaService.salvarFazenda(this.fazenda).subscribe(data => { /*Salvando um novo User */
        this.novo();
        this.router.navigate(['fazendaList']);
        console.info("Gravou Fazenda: " + data);
      });
    }
  }

}
