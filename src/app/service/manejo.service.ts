import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManejoService {


  constructor(private http: HttpClient) {
  }

  buscarManejo(idParcela: Number): Observable<any> {
    
    return this.http.get<any>(AppConstants.baseServidor + "controlirrigationapi/manejos/" + idParcela);

  }

}
