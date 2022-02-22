import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Clima } from 'src/app/model/Clima';
import { ClimaService } from 'src/app/service/clima.service';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {

  climas: Observable<Clima[]>;

  constructor(private climaService: ClimaService) { }

  ngOnInit(): void {

    let idFazenda:Number =+ JSON.parse(localStorage.getItem('idFazenda'));
    console.info("g: " + JSON.stringify(idFazenda));
    this.climaService.getClimaListByFazenda(idFazenda).subscribe(data => {
      this.climas = data;
      //this.total = data.totalElements;
    });

  }

  excluirClima(id: Number) {

    if (confirm('Deseja mesmo remover?')) {

      this.climaService.deletarClima(id).subscribe(data => {
       // console.log("Retorno do método delete : " + data);

       //this.culturas.splice(index, 1);/*Remover da tela*/
       // this.usuarioService.getStudentList().subscribe(data => {
       //   this.students = data;
       // });

      });
    }
  }

}
