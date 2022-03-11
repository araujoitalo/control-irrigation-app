import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Clima } from 'src/app/model/Clima';
import { ClimaService } from 'src/app/service/clima.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {

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
      idClima: {
        title: 'ID Clima',
        type: 'number',
        readonly: true,
        editable: false,
      },
      dataClima: {
        title: 'Data Clima',
        type: 'date',
      },
      temperaturaMaxima: {
        title: 'Temperatura Máxima',
        type: 'number',
      },
      temperaturaMinima: {
        title: 'Temperatura Mínima',
        type: 'number',
      },
      temperaturaMedia: {
        title: 'Temperatura Média',
        type: 'number',
      },
      umidadeRelativa: {
        title: 'Umidade Relativa',
        type: 'number',
      }, 
      velocidadeVento: {
        title: 'Velecidade do Vento',
        type: 'number',
      }, 
      precipitacao: {
        title: 'Precipitação Total',
        type: 'number',
      }, 
      radiacaoMedia: {
        title: 'Radiação',
        type: 'number',
      }, 
    },
  };

  climas: Observable<Clima[]>;
  clima = new Clima();

  idFazenda: Number =+ JSON.parse(localStorage.getItem('idFazenda'));

  constructor(private climaService: ClimaService,
    private router: Router,
    private routeActive: ActivatedRoute,) { }

  ngOnInit(): void {

    let idFazenda:Number =+ JSON.parse(localStorage.getItem('idFazenda'));
    this.climaService.getClimaListByFazenda(idFazenda).subscribe(data => {
      //this.source.load(data);
      this.climas = data;
      //this.total = data.totalElements;
    });

  }

  excluirClima(event) {
    
    if (window.confirm('Tem certeza de que deseja excluir?')) {
      this.climaService.deletarClima(event.data.idClima).subscribe(data => {
        // console.log("Retorno do método delete : " + data);
 
        //this.culturas.splice(index, 1);/*Remover da tela*/
        // this.usuarioService.getStudentList().subscribe(data => {
        //   this.students = data;
        // });
 
       });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }

  }


  novo() {
    this.clima = new Clima();
  }

  salvarClima(event) {

    console.log("Edit Event In Console")
    console.log(event);
    if (this.clima.idClima != null && this.clima.idClima.toString().trim() != null) { /* Atualizando ou Editando*/
     
      console.log(this.clima);
      this.climaService.updateClima(this.clima).subscribe(data => {
        this.novo();
        this.router.navigate(['climaList']);
        console.info("Clima Atualizado: " + data);
      });
    } 
    else {
      
      event.newData.idFazenda = this.idFazenda;
      console.log("Create Event In Console")
      console.log(event);
      this.climaService.salvarClima(event.newData).subscribe(data => { /*Salvando um novo Clima */
        this.novo();
        console.info("Gravou Clima: " + data);
      });
      event.confirm.resolve(event.newData)
  
  }
}

onEditConfirm(event) {

  console.log("Edit Event In Console")
  console.log(event);
  this.climaService.updateClima(event.newData).subscribe(data => {
    this.novo();
    console.info("Clima Atualizado: " + data);
  });
  event.confirm.resolve(event.newData)
}


}
