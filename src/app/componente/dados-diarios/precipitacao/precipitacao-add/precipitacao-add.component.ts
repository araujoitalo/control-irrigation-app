import { Observable } from 'rxjs';
import { Irrigacao } from './../../../../model/Irrigacao';
import { Parcela } from './../../../../model/Parcela';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParcelaService } from 'src/app/service/parcela.service';
import { PrecipitacaoService } from 'src/app/service/precipitacao.service';
import { Precipitacao } from 'src/app/model/Precipitacao';

@Component({
  selector: 'app-precipitacao-add',
  templateUrl: './precipitacao-add.component.html',
  styleUrls: ['./precipitacao-add.component.css']
})
export class PrecipitacaoAddComponent implements OnInit {

  precipitacao = new Precipitacao();
  parcelas: Observable<Parcela[]>;

  idFazenda: Number =+ JSON.parse(localStorage.getItem('idFazenda'));

  constructor(
    private router: Router,
    private routeActive: ActivatedRoute,
    private precipitacaoService: PrecipitacaoService,
    private parcelaService: ParcelaService
  ) { }

  ngOnInit(): void {

    let id = this.routeActive.snapshot.paramMap.get('id');
    
    
    if (id != null) {
      this.precipitacaoService.getPrecipitacao(id).subscribe(data => {
        this.precipitacao = data;
      });
    }


    this.parcelaService. getParcelaList(this.idFazenda).subscribe(data => {
      this.parcelas = data;
      //this.total = data.totalElements;
    });
  }

  novo() {
    this.precipitacao= new Precipitacao();
  }

  salvarPrecipitacao() {
    if (this.precipitacao.idPrecipitacao != null && this.precipitacao.idPrecipitacao.toString().trim() != null) { /* Atualizando ou Editando*/
 
      this.precipitacaoService.updatePrecipitacao(this.precipitacao).subscribe(data => {
        this.novo();
        this.router.navigate(['precipitacaoList']);
        console.info("Precipitacao Atualizado: " + data);
      });
    } else {
      this.precipitacaoService.salvarPrecipitacao(this.precipitacao).subscribe(data => { /*Salvando um novo Clima */
        this.novo();
        this.router.navigate(['precipitacaoList']);
        console.info("Gravou Precipitacao: " + data);
      });
    }
  }

}
