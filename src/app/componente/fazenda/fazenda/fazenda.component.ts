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

  fazendas: Observable<Fazenda[]>;

  constructor(
    private fazendaService: FazendaService
  ) { }

  ngOnInit(): void {

    let idUsuario:Number =+ JSON.parse(localStorage.getItem('idUsuario'));

    this.fazendaService.getFazendasList(idUsuario).subscribe(data => {
      this.fazendas = data;
      //this.total = data.totalElements;
    });
  }

  excluirFazenda(id: Number) {

    if (confirm('Deseja mesmo remover?')) {

      this.fazendaService.deletarFazenda(id).subscribe(data => {
       // console.log("Retorno do método delete : " + data);

       //this.culturas.splice(index, 1);/*Remover da tela*/
       // this.usuarioService.getStudentList().subscribe(data => {
       //   this.students = data;
       // });

      });
    }
  }

}
