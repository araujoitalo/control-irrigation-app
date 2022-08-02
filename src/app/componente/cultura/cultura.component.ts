import { Observable, timer } from 'rxjs';
import { CulturaService } from 'src/app/service/cultura.service';
import { Component, OnInit } from '@angular/core';
import { Cultura } from 'src/app/model/Cultura';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cultura',
  templateUrl: './cultura.component.html',
  styleUrls: ['./cultura.component.css']
})
export class CulturaComponent implements OnInit {

  culturas: Observable<Cultura[]>;
  total: number;

  constructor(
    private culturaService: CulturaService,
    private router: Router) { }

  ngOnInit() {

    let idFazenda:Number =+ JSON.parse(localStorage.getItem('idFazenda'));

    this.culturaService.getCulturaList(idFazenda).subscribe(data => {
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
