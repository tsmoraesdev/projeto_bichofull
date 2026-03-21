import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(data: { email: string; senha: string }): Observable<{ token: string; nome: string }> {
    return of({
      token: 'mock-token-123',
      nome: 'Usuário Teste'
    });
  }

  register(data: { nome: string; email: string; senha: string }): Observable<any> {
    return of({
      message: 'Usuário cadastrado com sucesso'
    });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}