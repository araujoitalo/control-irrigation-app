import { OutorgaService } from './../../../../service/outorga.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Outorga } from 'src/app/model/Outorga';

@Component({
  selector: 'app-outorga',
  templateUrl: './outorga.component.html',
  styleUrls: ['./outorga.component.css']
})
export class OutorgaComponent implements OnInit {

  outorgas: Observable<Outorga[]>;

  idFazenda: Number =+ JSON.parse(localStorage.getItem('idFazenda'));

  constructor(private outorgaService: OutorgaService) { }

  ngOnInit(): void {
    this.outorgaService.getOutorgaList(this.idFazenda).subscribe(data => {
      this.outorgas = data;
    });
  }

  excluirOutorga(id: Number) {

    if (confirm('Deseja mesmo remover?')) {

      this.outorgaService.deletarOutorga(id).subscribe(data => {
       // console.log("Retorno do método delete : " + data);

       //this.culturas.splice(index, 1);/*Remover da tela*/
       // this.usuarioService.getStudentList().subscribe(data => {
       //   this.students = data;
       // });

      });
    }
  }

}
