import { ParcelaService } from './../../../../service/parcela.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Irrigacao } from 'src/app/model/Irrigacao';
import { IrrigacaoService } from 'src/app/service/irrigacao.service';
import { Parcela } from 'src/app/model/Parcela';

@Component({
  selector: 'app-irrigacao',
  templateUrl: './irrigacao.component.html',
  styleUrls: ['./irrigacao.component.css']
})
export class IrrigacaoComponent implements OnInit {

  irrigacoes: Observable<Irrigacao[]>;
  parcelas: Observable<Parcela[]>;
  parcelaSelecionada: Number;

  idFazenda: Number =+ JSON.parse(localStorage.getItem('idFazenda'));

  constructor(
    private irrigacaoService: IrrigacaoService,
    private parcelaService: ParcelaService) { }

  ngOnInit(): void {

    this.parcelaService.getParcelaList(this.idFazenda).subscribe(data => {
      this.parcelas = data;
    })
   
  }

  buscaParcela() {
    this.irrigacaoService.getIrrrigacaoListByParcela(this.parcelaSelecionada).subscribe(data => {
      this.irrigacoes = data;
    });
  }
}
