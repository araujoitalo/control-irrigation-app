import { AppConstants } from '../app-constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IrrigacaoService {


  constructor(private http: HttpClient) {
  }

  getIrrigacaoList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlIrrigacoes);
  }

  getIrrigacao(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlIrrigacoes + id);
  }


  salvarIrrigacao(irrigacao): Observable<any> {
    console.info("Irrigacao bug: " + JSON.stringify(irrigacao));
    return this.http.post<any>(AppConstants.baseUrlIrrigacoes, irrigacao);
  }

  updateIrrigacao(irrigacao): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlIrrigacoes, irrigacao);
  }

  deletarIrrigacao(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlIrrigacoes + id, { responseType: 'text' });
  }


}
