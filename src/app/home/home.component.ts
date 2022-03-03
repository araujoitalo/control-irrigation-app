import { Fazenda } from './../model/Fazenda';
import { User } from './../model/User';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Observable } from 'rxjs';
import { ManejoService } from './../service/manejo.service';
import { Component, OnInit } from '@angular/core';
import { Manejo } from '../model/Manejo';
import { FazendaService } from '../service/fazenda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  manejos: Observable<Manejo[]>;
  fazenda = new Fazenda();
  usuarioLogado = new User();

  constructor(
    private manejoService: ManejoService,
    private usuarioService: UsuarioService,
    private fazendaService: FazendaService) { }

  ngOnInit() {
    
  this.usuarioService.recuperarUsuario().subscribe(data => {
    this.usuarioLogado = data;
    localStorage.setItem('idUsuario', JSON.stringify(this.usuarioLogado.idUsuario));
    //console.info("idUsuario: " + this.usuarioLogado.idUsuario);
    
    let idUsuario:Number =+ JSON.parse(localStorage.getItem('idUsuario'));
    this.fazendaService.getPrimeiraFazenda(idUsuario).subscribe(data => {
      this.fazenda = data;
      console.info("fazenda: " + this.fazenda.idFazenda);
      localStorage.setItem('idFazenda', JSON.stringify(this.fazenda.idFazenda));
    });
    
    this.manejoService.buscarManejo(idUsuario).subscribe(data => {
        this.manejos = data;
        
      });
    });
  }
}
