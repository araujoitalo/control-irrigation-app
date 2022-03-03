import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Precipitacao } from 'src/app/model/Precipitacao';
import { Parcela } from 'src/app/model/Parcela';
import { PrecipitacaoService } from 'src/app/service/precipitacao.service';
import { ParcelaService } from 'src/app/service/parcela.service';

@Component({
  selector: 'app-precipitacao',
  templateUrl: './precipitacao.component.html',
  styleUrls: ['./precipitacao.component.css']
})
export class PrecipitacaoComponent implements OnInit {

  precipitacoes: Observable<Precipitacao[]>;
  parcelas: Observable<Parcela[]>;
  parcelaSelecionada: Number;

  idFazenda: Number =+ JSON.parse(localStorage.getItem('idFazenda'));

  constructor(
      private precipitacaoService: PrecipitacaoService,
      private parcelaService: ParcelaService) { }
   

  ngOnInit(): void {
    this.parcelaService.getParcelaList(this.idFazenda).subscribe(data => {
      this.parcelas = data;
    })

  }
  buscaPrecipitacoes() {
    this.precipitacaoService.getIrrrigacaoListByPrecipitacao(this.parcelaSelecionada).subscribe(data => {
      this.precipitacoes = data;
    });
  }

}
