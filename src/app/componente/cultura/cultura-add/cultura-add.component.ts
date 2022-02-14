import { CulturaFase } from './../../../model/CulturaFase';
import { ActivatedRoute, Router } from '@angular/router';
import { Cultura } from 'src/app/model/Cultura';
import { Component, OnInit } from '@angular/core';
import { CulturaService } from 'src/app/service/cultura.service';

@Component({
  selector: 'app-cultura-add',
  templateUrl: './cultura-add.component.html',
  styleUrls: ['./cultura-add.component.css']
})
export class CulturaAddComponent implements OnInit {

  cultura = new Cultura();

  culturaFase = new CulturaFase();

  constructor(
    private router: Router,
    private routeActive: ActivatedRoute, 
    private culturaService: CulturaService
    ) { 
      
    }

  ngOnInit(): void {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.culturaService.getCultura(id).subscribe(data => {
        this.cultura = data;
      });
    }
  }


  salvarCultura() {
    if (this.cultura.idCultura != null && this.cultura.idCultura.toString().trim() != null) { /* Atualizando ou Editando*/
      this.culturaService.updateCultura(this.cultura).subscribe(data => {
        this.novo();
        this.router.navigate(['culturaList']);
        console.info("Cultura Atualizado: " + data);
      });
    } else {
      this.cultura.idFazenda = 1;
      this.culturaService.salvarCultura(this.cultura).subscribe(data => { /*Salvando um novo User */
        this.novo();
        this.router.navigate(['culturaList']);
        console.info("Gravou Cultura: " + data);
      });
    }
  }

  novo() {
    this.cultura = new Cultura();
    this.culturaFase = new CulturaFase();
  }

  adicionaCulturaFase() {
    if (this.cultura.culturaFases === undefined){
      this.cultura.culturaFases = new Array<CulturaFase>();
    }

    this.culturaFase.idCultura = this.cultura.idCultura;
    this.cultura.culturaFases.push(this.culturaFase);
    this.culturaFase = new CulturaFase();
  }

  deletarCulturaFase(id, i) {

    if (id == null){
      this.cultura.culturaFases.splice(i, 1);
      return;
    }

    if (i !== null && confirm("Deseja remover?")){
      this.culturaService.removerCulturaFase(id).subscribe(data => {
        this.cultura.culturaFases.splice(i, 1);
      });
    }
  }

}
