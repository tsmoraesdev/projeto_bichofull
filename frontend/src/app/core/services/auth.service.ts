import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = 'http://localhost:8080/auth';
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  login(data: { email: string; senha: string }): Observable<{ token: string; nome: string }> {
    return this.http.post<{ token: string; nome: string }>(`${this.API}/login`, data);
  }

  register(data: { nome: string; email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.API}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
