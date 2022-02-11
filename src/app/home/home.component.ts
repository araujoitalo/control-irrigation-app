import { User } from './../model/User';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Observable } from 'rxjs';
import { ManejoService } from './../service/manejo.service';
import { Component, OnInit } from '@angular/core';
import { Manejo } from '../model/Manejo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  manejos: Observable<Manejo[]>;
  usuarioLogado = new User();

  constructor(
    private manejoService: ManejoService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    
  this.usuarioService.recuperarUsuario().subscribe(data => {
    this.usuarioLogado = data;

    localStorage.setItem('idUsuario', JSON.stringify(this.usuarioLogado.idUsuario));

    console.info("home: " + this.usuarioLogado.idUsuario);
    let idUsuario:Number =+ JSON.parse(localStorage.getItem('idUsuario'));
    
    this.manejoService.buscarManejo(idUsuario).subscribe(data => {
        this.manejos = data;
 });

 
 });

  
  }

}
