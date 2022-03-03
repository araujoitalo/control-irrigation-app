import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Fazenda } from 'src/app/model/Fazenda';
import { FazendaService } from 'src/app/service/fazenda.service';

@Component({
  selector: 'app-fazenda',
  templateUrl: './fazenda.component.html',
  styleUrls: ['./fazenda.component.css']
})
export class FazendaComponent implements OnInit {

  fazendas: Array<Fazenda[]>;
  total: number;
  p: number = 1;
  idUsuario: Number =+ JSON.parse(localStorage.getItem('idUsuario'));

  constructor(
    private fazendaService: FazendaService
  ) { }

  ngOnInit(): void {

    this.fazendaService.getFazendasList(this.idUsuario).subscribe(data => {
      this.fazendas = data;
      this.total = data.totalElements;
    });
  }

  excluirFazenda(id: Number, index) {

    if (confirm('Deseja mesmo remover?')) {
      this.fazendaService.deletarFazenda(id).subscribe(data => {
       this.fazendas.splice(index, 1);/*Remover da tela*/
      });
    }
  }

}
