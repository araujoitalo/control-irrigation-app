import { AppConstants } from '../app-constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrecipitacaoService {


  constructor(private http: HttpClient) {
  }

  getPrecipitacaoList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPrecipitacoes);
  }

  getIrrrigacaoListByPrecipitacao(idPrecipitacao): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPrecipitacoes + "buscaPrecipitacoes/"+ idPrecipitacao);
  }

  getPrecipitacao(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlPrecipitacoes + id);
  }


  salvarPrecipitacao(precipitacao): Observable<any> {
    console.info("Irrigacao bug: " + JSON.stringify(precipitacao));
    return this.http.post<any>(AppConstants.baseUrlPrecipitacoes, precipitacao);
  }

  updatePrecipitacao(precipitacao): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlPrecipitacoes, precipitacao);
  }

  deletarPrecipitacao(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlPrecipitacoes + id, { responseType: 'text' });
  }


}
