import { Fazenda } from './../model/Fazenda';
import { AppConstants } from '../app-constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FazendaService {


  constructor(private http: HttpClient) {
  }

  getFazendasList(idUsuario): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlFazenda + idUsuario);
  }

  getStudentListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina);
  }

  getStudant(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + id);
  }


  deletarUsuario(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, { responseType: 'text' });
  }


  //http://localhost:8080/cursospringrestapi/usuario/usuarioPorNome/alex
  consultarUser(nome: String): Observable<any> {
    return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome);

  }

  consultarUserPorPage(nome: String, page: Number): Observable<any> {
    return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome + "/page/" + page);

  }

  salvarFazenda(fazenda): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlFazenda, fazenda);
  }

  updateFazenda(fazenda): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlFazenda, fazenda);
  }

  userAutenticado() {

    if (localStorage.getItem('token') !== null &&
      localStorage.getItem('token').toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }

  removerTelefone(id): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + "removerTelefone/" + id, { responseType: 'text' });
  }



}
