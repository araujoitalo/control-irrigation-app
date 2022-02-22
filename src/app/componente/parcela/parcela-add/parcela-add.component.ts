import { CulturaService } from 'src/app/service/cultura.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Parcela } from 'src/app/model/Parcela';
import { ParcelaService } from 'src/app/service/parcela.service';
import { Cultura } from 'src/app/model/Cultura';
import { Gotejador } from 'src/app/model/Gotejador';
import { GotejadorService } from 'src/app/service/gotejador.service';

@Component({
  selector: 'app-parcela-add',
  templateUrl: './parcela-add.component.html',
  styleUrls: ['./parcela-add.component.css']
})
export class ParcelaAddComponent implements OnInit {

  parcela = new Parcela();
  culturas: Observable<Cultura[]>;
  gotejadores: Observable<Gotejador[]>;

  constructor(
    private router: Router,
    private routeActive: ActivatedRoute,
    private parcelaService: ParcelaService,
    private culturaService: CulturaService,
    private gotejadorService: GotejadorService
  ) { }

  ngOnInit(): void {
    
    let id = this.routeActive.snapshot.paramMap.get('id');
  
    if (id != null) {
      this.parcelaService.getParcela(id).subscribe(data => {
        this.parcela = data;
      });
    }
      let idFazenda = 1;
      this.culturaService.getCulturaListByFazenda(idFazenda).subscribe(data => {
        this.culturas = data;
        //this.total = data.totalElements;
      });

    
      this.gotejadorService.getGotejadorListByFazenda(idFazenda).subscribe(data => {
        this.gotejadores = data;
        //this.total = data.totalElements;
      });
   
  }

  novo() {
    this.parcela = new Parcela();
  }

  salvarParcela() {
    if (this.parcela.idParcela != null && this.parcela.idParcela.toString().trim() != null) { /* Atualizando ou Editando*/
     
      this.parcelaService.updateParcela(this.parcela).subscribe(data => {
        this.novo();
        this.router.navigate(['parcelaList']);
        console.info("Parcela Atualizado: " + data);
      });
    } else {
      this.parcela.idFazenda = 1;
      this.parcelaService.salvarParcela(this.parcela).subscribe(data => { /*Salvando um novo Clima */
        this.novo();
        this.router.navigate(['parcelaList']);
        console.info("Gravou Parcela: " + data);
      });
    }
  }


}
