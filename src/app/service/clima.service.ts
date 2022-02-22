import { Clima } from './../model/Clima';
import { AppConstants } from '../app-constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {


  constructor(private http: HttpClient) {
  }

  getClimaList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlClimas);
  }

  getClimaListByFazenda(idFazenda): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlClimas + "buscaClimas/"+ idFazenda);
  }

  getClima(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlClimas + id);
  }


  salvarClima(clima): Observable<any> {
    console.info("clima bug: " + JSON.stringify(clima));
    return this.http.post<any>(AppConstants.baseUrlClimas, clima);
  }

  updateClima(clima): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlClimas, clima);
  }

  deletarClima(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlClimas + id, { responseType: 'text' });
  }


}
