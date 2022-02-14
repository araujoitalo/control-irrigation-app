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

}
