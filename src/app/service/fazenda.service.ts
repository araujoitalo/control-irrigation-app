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
    return this.http.get<any>(AppConstants.baseUrlFazenda + "buscaFazendas/"+ idUsuario);
  }

  getFazenda(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlFazenda + id);
  }

  deletarFazenda(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlFazenda + id, { responseType: 'text' });
  }

  salvarFazenda(fazenda): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlFazenda, fazenda);
  }

  updateFazenda(fazenda): Observable<any> {
    console.info("update: " + JSON.stringify(fazenda));
    return this.http.put<any>(AppConstants.baseUrlFazenda, fazenda);
  }


}
