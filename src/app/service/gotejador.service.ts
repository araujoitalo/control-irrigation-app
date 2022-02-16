import { AppConstants } from '../app-constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GotejadorService {


  constructor(private http: HttpClient) {
  }

  getGotejadorList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlGotejador);
  }

  getGotejador(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrlGotejador + id);
  }


  salvarGotejador(gotejador): Observable<any> {
    console.info("gotejador bug: " + JSON.stringify(gotejador));
    return this.http.post<any>(AppConstants.baseUrlGotejador, gotejador);
  }

  updateGotejador(gotejador): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrlGotejador, gotejador);
  }

  deletarGotejador(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrlGotejador + id, { responseType: 'text' });
  }


}
