import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Irrigacao } from 'src/app/model/Irrigacao';
import { IrrigacaoService } from 'src/app/service/irrigacao.service';

@Component({
  selector: 'app-irrigacao',
  templateUrl: './irrigacao.component.html',
  styleUrls: ['./irrigacao.component.css']
})
export class IrrigacaoComponent implements OnInit {

  irrigacoes: Observable<Irrigacao[]>;

  constructor(private irrigacaoService: IrrigacaoService) { }

  ngOnInit(): void {
    this.irrigacaoService.getIrrigacaoList().subscribe(data => {
      this.irrigacoes = data;
    })
  }

}
