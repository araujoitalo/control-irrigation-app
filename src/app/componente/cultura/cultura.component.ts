import { Observable } from 'rxjs';
import { CulturaService } from 'src/app/service/cultura.service';
import { Component, OnInit } from '@angular/core';
import { Cultura } from 'src/app/model/Cultura';

@Component({
  selector: 'app-cultura',
  templateUrl: './cultura.component.html',
  styleUrls: ['./cultura.component.css']
})
export class CulturaComponent implements OnInit {

  culturas: Observable<Cultura[]>;
  total: number;

  constructor(private culturaService: CulturaService) { }

  ngOnInit() {

    this.culturaService.getCulturaList().subscribe(data => {
      this.culturas = data;
      //this.total = data.totalElements;
    });
  }

  excluirCultura(id: Number) {

    if (confirm('Deseja mesmo remover?')) {

      this.culturaService.deletarCultura(id).subscribe(data => {
       // console.log("Retorno do método delete : " + data);

       //this.culturas.splice(index, 1);/*Remover da tela*/
       // this.usuarioService.getStudentList().subscribe(data => {
       //   this.students = data;
       // });

      });
    }
  }

}
