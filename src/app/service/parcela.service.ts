import { AppConstants } from '../app-constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelaService {


  constructor(private http: HttpClient) {
  }

  getParcelaList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlParcelas);
  }

  getParcela(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlParcelas + id);
  }


  salvarParcela(parcela): Observable<any> {
    console.info("Parcela bug: " + JSON.stringify(parcela));
    return this.http.post<any>(AppConstants.baseUrlParcelas, parcela);
  }

  updateParcela(parcela): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlParcelas, parcela);
  }

  deletarParcela(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlParcelas + id, { responseType: 'text' });
  }


}
