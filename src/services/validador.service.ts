import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

export interface ValidacionRequest {
  placa: string;
  fecha: string;
  hora: string;
}

export interface ValidacionResponse {
  placa: string;
  puedeCircular: boolean;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {
  private apiUrl = `${environment.apiUrl}/validar`;

  constructor(private http: HttpClient) {}

  validar(data: ValidacionRequest): Observable<ValidacionResponse> {
    return this.http.post<ValidacionResponse>(this.apiUrl, data);
  }
}
