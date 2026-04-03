import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BetRequest {
  tipo_aposta: string;
  palpite: string;
  valor_apostado: number;
}

export interface SortearApostasRequest {
  apostaIds: number[];
}

@Injectable({
  providedIn: 'root'
})
export class BetsService {
  private apiUrl = 'http://localhost:8080/apostas';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  registrarAposta(payload: BetRequest): Observable<any> {
    return this.http.post(this.apiUrl, payload, {
      headers: this.getHeaders()
    });
  }

  listarMinhasApostas(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  sortearApostas(payload: SortearApostasRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/sortear`, payload, {
      headers: this.getHeaders()
    });
  }

  removerAposta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
