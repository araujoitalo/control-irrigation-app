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
  precipitacao = new Precipitacao();
  parcelas: Observable<Parcela[]>;
  parcelaSelecionada: Number;

  idFazenda: Number =+ JSON.parse(localStorage.getItem('idFazenda'));

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave : true,
     
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      
      dataPrecipitacao: {
        title: 'Data Precipitação',
        type: 'date',
      },
      idParcela: {
        title: 'Parcela',
        type: 'number',
      },
      chuva: {
        title: 'Chuva',
        type: 'number',
      },
   
    },
  };

  constructor(
      private precipitacaoService: PrecipitacaoService,
      private parcelaService: ParcelaService) { }
   

  ngOnInit(): void {
    this.parcelaService.getParcelaList(this.idFazenda).subscribe(data => {
      this.parcelas = data;
    })

  }

  novo() {
    this.precipitacao = new Precipitacao();
  }

  excluirPrecipitacao(event) {

    if (window.confirm('Tem certeza de que deseja excluir?')) {
      this.precipitacaoService.deletarPrecipitacao(event.data.idPrecipitacao).subscribe(data => {
  
       });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }

  }

  salvarPrecipitacao(event) {

    if (this.precipitacao.idPrecipitacao != null && this.precipitacao.idPrecipitacao.toString().trim() != null) { /* Atualizando ou Editando*/
     
      this.precipitacaoService.updatePrecipitacao(this.precipitacao).subscribe(data => {
        this.novo();

      });
    } 
    else {
      
      event.newData.idFazenda = this.idFazenda;
   
      this.precipitacaoService.salvarPrecipitacao(event.newData).subscribe(data => { 
        this.novo();
        console.info("Gravou Precipitação: " + data);
      });
      event.confirm.resolve(event.newData)
  
  }
}

onEditConfirm(event) {

  this.precipitacaoService.updatePrecipitacao(event.newData).subscribe(data => {
    this.novo();

  });
  event.confirm.resolve(event.newData)
}

  buscaPrecipitacoes() {
    this.precipitacaoService.getIrrrigacaoListByPrecipitacao(this.parcelaSelecionada).subscribe(data => {
      this.precipitacoes = data;
    });
  }

}
