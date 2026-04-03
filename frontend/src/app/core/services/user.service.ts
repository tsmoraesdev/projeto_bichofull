import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioAutenticado {
  id: number;
  nome: string;
  email: string;
  saldo: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  buscarUsuarioLogado(): Observable<UsuarioAutenticado> {
    return this.http.get<UsuarioAutenticado>(`${this.apiUrl}/me`);
  }
}
