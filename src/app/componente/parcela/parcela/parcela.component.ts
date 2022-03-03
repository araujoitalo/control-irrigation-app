import { ParcelaService } from './../../../service/parcela.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Parcela } from 'src/app/model/Parcela';

@Component({
  selector: 'app-parcela',
  templateUrl: './parcela.component.html',
  styleUrls: ['./parcela.component.css']
})
export class ParcelaComponent implements OnInit {

  parcelas: Observable<Parcela[]>;

  idFazenda: Number =+ JSON.parse(localStorage.getItem('idFazenda'));

  constructor(private parcelaService: ParcelaService) { }

  ngOnInit(): void {
    this.parcelaService.getParcelaList(this.idFazenda).subscribe(data => {
      this.parcelas = data;
    })
  }

  excluirParcela(id: Number) {

    if (confirm('Deseja mesmo remover?')) {

      this.parcelaService.deletarParcela(id).subscribe(data => {
       // console.log("Retorno do método delete : " + data);

       //this.culturas.splice(index, 1);/*Remover da tela*/
       // this.usuarioService.getStudentList().subscribe(data => {
       //   this.students = data;
       // });

      });
    }
  }

}
