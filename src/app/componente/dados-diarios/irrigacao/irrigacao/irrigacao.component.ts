import { CheckboxSelectAllComponent } from './../../../../checkbox.component';
import { Router } from '@angular/router';
import { ParcelaService } from './../../../../service/parcela.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { Irrigacao } from 'src/app/model/Irrigacao';
import { IrrigacaoService } from 'src/app/service/irrigacao.service';
import { Parcela } from 'src/app/model/Parcela';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from 'src/app/smart-table-datepicker/smart-table-datepicker.component';

@Component({
  selector: 'app-irrigacao',
  templateUrl: './irrigacao.component.html',
  styleUrls: ['./irrigacao.component.css']
})


export class IrrigacaoComponent implements OnInit {

  irrigacoes: Observable<Irrigacao[]>;
  irrigacao = new Irrigacao();
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
      
      dataIrrigacao: {
        title: 'Data Irrigação',
        type: 'date',
        renderComponent: SmartTableDatepickerRenderComponent,
        width: '250px',
        filter: false,
        sortDirection: 'desc',
        editor: {
          type: 'custom',
          component: SmartTableDatepickerComponent,
        }
      
      },
      idParcela: {
        title: 'Parcela',
        type: 'number',
      },
      quantidade: {
        title: 'Quantidade',
        type: 'number',
      },
      fertirrigacao: {
        title: 'Fertirrigação',
        type: 'custom',
        renderComponent: CheckboxViewComponent,
        filter: {
          type: 'checkbox',
          config: {
            true: 'Sim',
            false: 'Não',
            resetText: 'Limpar',
          },
        },
      },
    }
  };

  constructor(
    private irrigacaoService: IrrigacaoService,
    private parcelaService: ParcelaService,
    private router: Router) { }

  ngOnInit(): void {

    this.parcelaService.getParcelaList(this.idFazenda).subscribe(data => {
      this.parcelas = data;
    })
   
  }

  novo() {
    this.irrigacao = new Irrigacao();
  }

  excluirIrrigacao(event) {
    
    if (window.confirm('Tem certeza de que deseja excluir?')) {
      this.irrigacaoService.deletarIrrigacao(event.data.idIrrigacao).subscribe(data => {
       });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }

  }

  salvarIrrigacao(event) {

    if (this.irrigacao.idIrrigacao != null && this.irrigacao.idIrrigacao.toString().trim() != null) { /* Atualizando ou Editando*/
     
      this.irrigacaoService.updateIrrigacao(this.irrigacao).subscribe(data => {
        this.novo();
        this.router.navigate(['irrigacaoList']);
   
      });
    } 
    else {
      
      event.newData.idFazenda = this.idFazenda;
   
      this.irrigacaoService.salvarIrrigacao(event.newData).subscribe(data => { 
        this.novo();
      });
      event.confirm.resolve(event.newData)
  
  }
}

onEditConfirm(event) {

  this.irrigacaoService.updateIrrigacao(event.newData).subscribe(data => {
    this.novo();
  });
  event.confirm.resolve(event.newData)
}


  buscaParcela() {
    this.irrigacaoService.getIrrrigacaoListByParcela(this.parcelaSelecionada).subscribe(data => {
      this.irrigacoes = data;
    });
  }
}


@Component({
  selector: 'checkbox-view',
  template: `
     <input type="checkbox" class="form-control" id="fertirrigacao" required="false" name="fertirrigacao" autocomplete="false">
  `,
})
export class CheckboxViewComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}