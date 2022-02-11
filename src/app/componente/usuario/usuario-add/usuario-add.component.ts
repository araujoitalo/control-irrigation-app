import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Telefone } from 'src/app/model/Telefone';
import { User } from 'src/app/model/User';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();

  telefone = new Telefone();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.getStudant(id).subscribe(data => {
        this.usuario = data;
      });
    }

  }


  salvarUser() {
    if (this.usuario.idUsuario != null && this.usuario.idUsuario.toString().trim() != null) { /* Atualizando ou Editando*/
      this.userService.updateUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info("User Atualizado: " + data);
      });
    } else {
      this.userService.salvarUsuario(this.usuario).subscribe(data => { /*Salvando um novo User */
        this.novo();
        console.info("Gravou User: " + data);
      });
    }
  }

  novo() {
    this.usuario = new User();
    this.telefone = new Telefone();
  }

  deletarTelefone(id, i) {

    if (id == null){
      this.usuario.telefones.splice(i, 1);
      return;
    }

    if (i !== null && confirm("Deseja remover?")){
      this.userService.removerTelefone(id).subscribe(data => {
        this.usuario.telefones.splice(i, 1);
      });
    }
  }

  addFone() {
    if (this.usuario.telefones === undefined){
      this.usuario.telefones = new Array<Telefone>();
    }

    this.telefone.id = this.usuario.idUsuario;
    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

}
