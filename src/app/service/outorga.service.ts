import { User } from '../model/User';
import { AppConstants } from '../app-constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutorgaService {


  constructor(private http: HttpClient) {
  }

  getOutorgaList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlOutorga);
  }

  getOutorga(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlOutorga + id);
  }


  salvarOutorga(outorga): Observable<any> {
    console.info("outorga bug: " + JSON.stringify(outorga));
    return this.http.post<any>(AppConstants.baseUrlOutorga, outorga);
  }

  updateOutorga(outorga): Observable<any> {
    console.info("outorga up bug: " + JSON.stringify(outorga));
    return this.http.put<any>(AppConstants.baseUrlOutorga, outorga);
  }

  deletarOutorga(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlOutorga + id, { responseType: 'text' });
  }

  removerOutorgaFase(id): Observable<any> {
    return this.http.delete(AppConstants.baseUrlPath + "removerOutrogaFase/" + id, { responseType: 'text' });
  }


}
