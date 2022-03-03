import { Observable } from 'rxjs';
import { Irrigacao } from './../../../../model/Irrigacao';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IrrigacaoService } from 'src/app/service/irrigacao.service';
import { FazendaService } from 'src/app/service/fazenda.service';
import { Parcela } from 'src/app/model/Parcela';
import { ParcelaService } from 'src/app/service/parcela.service';

@Component({
  selector: 'app-irrigacao-add',
  templateUrl: './irrigacao-add.component.html',
  styleUrls: ['./irrigacao-add.component.css']
})
export class IrrigacaoAddComponent implements OnInit {

  irrigacao = new Irrigacao();
  parcelas: Observable<Parcela[]>;

  idFazenda: Number =+ JSON.parse(localStorage.getItem('idFazenda'));

  constructor(
    private router: Router,
    private routeActive: ActivatedRoute,
    private irrigacaoService: IrrigacaoService,
    private parcelaService: ParcelaService
  ) { }

  ngOnInit(): void {
    let id = this.routeActive.snapshot.paramMap.get('id');
    
    
    if (id != null) {
      this.irrigacaoService.getIrrigacao(id).subscribe(data => {
        this.irrigacao = data;
      });
    }


    this.parcelaService. getParcelaList(this.idFazenda).subscribe(data => {
      this.parcelas = data;
      //this.total = data.totalElements;
    });
   
  }

  novo() {
    this.irrigacao = new Irrigacao();
  }

  salvarIrrigacao() {
    if (this.irrigacao.idIrrigacao != null && this.irrigacao.idIrrigacao.toString().trim() != null) { /* Atualizando ou Editando*/
      this.irrigacao.gotejo = 1;
      this.irrigacaoService.updateIrrigacao(this.irrigacao).subscribe(data => {
        this.novo();
        this.router.navigate(['irrigacaoList']);
        console.info("Irrigacao Atualizado: " + data);
      });
    } else {
      this.irrigacaoService.salvarIrrigacao(this.irrigacao).subscribe(data => { /*Salvando um novo Clima */
        this.novo();
        this.router.navigate(['irrigacaoList']);
        console.info("Gravou Irrigação: " + data);
      });
    }
  }

  onSelectParcela(id) {
    this.irrigacao.idParcela = id;
  }


}
