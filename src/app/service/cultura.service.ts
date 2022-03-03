import { User } from './../model/User';
import { AppConstants } from './../app-constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CulturaService {


  constructor(private http: HttpClient) {
  }

  getCulturaList(idFazenda): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCultura + "buscaCulturas/"+ idFazenda);
  }

  getCulturaListByFazenda(idFazenda): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCultura + "buscaCulturas/"+ idFazenda);
  }

  getCultura(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlCultura + id);
  }

  salvarCultura(cultura): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlCultura, cultura);
  }

  updateCultura(cultura): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlCultura, cultura);
  }

  deletarCultura(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlCultura + id, { responseType: 'text' });
  }

  removerCulturaFase(id): Observable<any> {
    return this.http.delete(AppConstants.baseUrlPath + "removerCulturaFase/" + id, { responseType: 'text' });
  }


}
