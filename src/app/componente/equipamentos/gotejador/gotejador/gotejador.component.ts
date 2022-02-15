import { Observable } from 'rxjs';
import { Gotejador } from 'src/app/model/Gotejador';
import { Component, OnInit } from '@angular/core';
import { GotejadorService } from 'src/app/service/gotejador.service';

@Component({
  selector: 'app-gotejador',
  templateUrl: './gotejador.component.html',
  styleUrls: ['./gotejador.component.css']
})
export class GotejadorComponent implements OnInit {

  gotejadores: Observable<Gotejador[]>;

  constructor(private gotejadorService: GotejadorService) { }

  ngOnInit(): void {
    this.gotejadorService.getGotejadorList().subscribe(data => {
      this.gotejadores = data;
      //this.total = data.totalElements;
    });

  }

  excluirGotejador(id: Number) {

    if (confirm('Deseja mesmo remover?')) {

      this.gotejadorService.deletarGotejador(id).subscribe(data => {
       // console.log("Retorno do método delete : " + data);

       //this.culturas.splice(index, 1);/*Remover da tela*/
       // this.usuarioService.getStudentList().subscribe(data => {
       //   this.students = data;
       // });

      });
    }
  }

}
