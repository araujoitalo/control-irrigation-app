import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Clima } from 'src/app/model/Clima';
import { ClimaService } from 'src/app/service/clima.service';

@Component({
  selector: 'app-clima-add',
  templateUrl: './clima-add.component.html',
  styleUrls: ['./clima-add.component.css']
})
export class ClimaAddComponent implements OnInit {

  clima = new Clima();

  idFazenda: Number =+ JSON.parse(localStorage.getItem('idFazenda'));

  constructor(
    private router: Router,
    private routeActive: ActivatedRoute,
    private climaService: ClimaService
  ) { }

  ngOnInit(): void {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.climaService.getClima(id).subscribe(data => {
        this.clima = data;
      });
    }
  }

  novo() {
    this.clima = new Clima();
  }

  salvarClima() {
    if (this.clima.idClima != null && this.clima.idClima.toString().trim() != null) { /* Atualizando ou Editando*/
      this.climaService.updateClima(this.clima).subscribe(data => {
        this.novo();
        this.router.navigate(['climaList']);
        console.info("Clima Atualizado: " + data);
      });
    } else {
      this.clima.idFazenda = this.idFazenda;
      this.climaService.salvarClima(this.clima).subscribe(data => { /*Salvando um novo Clima */
        this.novo();
        this.router.navigate(['climaList']);
        console.info("Gravou Clima: " + data);
      });
    }
  }
}
