import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private http: HttpClient) {
  }

  getStudentList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
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

  salvarUsuario(user): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, user);
  }

  updateUsuario(user): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, user);
  }

  userAutenticado() {

    if (localStorage.getItem('token') !== null &&
      localStorage.getItem('token').toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }

}
