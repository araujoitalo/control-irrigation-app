import { Router, ActivatedRoute } from '@angular/router';
import { OutorgaService } from './../../../../service/outorga.service';
import { OutorgaFase } from './../../../../model/OutorgaFase';
import { Outorga } from './../../../../model/Outorga';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outorga-add',
  templateUrl: './outorga-add.component.html',
  styleUrls: ['./outorga-add.component.css']
})
export class OutorgaAddComponent implements OnInit {

  outorga = new Outorga();
  outorgaFase = new OutorgaFase();
  idFazenda: Number =+ JSON.parse(localStorage.getItem('idFazenda'));

  constructor(
    private router: Router,
    private routeActive: ActivatedRoute, 
    private outorgaService: OutorgaService
  ) { }

  ngOnInit(): void {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.outorgaService.getOutorga(id).subscribe(data => {
        this.outorga = data;
      });
    }
  }

  novo() {
    this.outorga = new Outorga();
    this.outorgaFase = new OutorgaFase();
  }

  adicionaOutorgaFase() {
    if (this.outorga.outorgaFases === undefined){
      this.outorga.outorgaFases = new Array<OutorgaFase>();
    }

    this.outorgaFase.idOutorga = this.outorga.idOutorga;
    this.outorga.outorgaFases.push(this.outorgaFase);
    this.outorgaFase = new OutorgaFase();
  }

  salvarOutorga() {
    if (this.outorga.idOutorga != null && this.outorga.idOutorga.toString().trim() != null) { /* Atualizando ou Editando*/
      this.outorgaService.updateOutorga(this.outorga).subscribe(data => {
        this.novo();
        this.router.navigate(['outorgaList']);
        console.info("Outorga Atualizado: " + data);
      });
    } else {
      this.outorga.idFazenda = this.idFazenda;
      this.outorgaService.salvarOutorga(this.outorga).subscribe(data => { /*Salvando um novo User */
        this.novo();
        this.router.navigate(['outorgaList']);
        console.info("Gravou Outorga: " + data);
      });
    }
  }

  deletarOutorgaFase(id, i) {

    if (id == null){
      this.outorga.outorgaFases.splice(i, 1);
      return;
    }

    if (i !== null && confirm("Deseja remover?")){
      this.outorgaService.removerOutorgaFase(id).subscribe(data => {
        this.outorga.outorgaFases.splice(i, 1);
      });
    }
  }



}
