import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  nome: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/auth/login';
  private funcionariosUrl = 'http://localhost:8080/api/funcionarios'; // 

  constructor(private http: HttpClient) {}

  // ---- LOGIN ----
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, data);
  }

  // ---- SALVAR TOKEN NO LOCALSTORAGE ----
  salvarLogin(response: LoginResponse) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('funcionarioLogado', JSON.stringify({
      nome: response.nome,
      id: response.id
    }));
  }

  // ---- OBTER TOKEN ----
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ---- CADASTRAR FUNCIONÁRIO ----
  cadastrar(funcionario: any): Observable<any> {
    return this.http.post(this.funcionariosUrl, funcionario);
  }  

  // ---- DESLOGAR ----
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('funcionarioLogado');
  }

  // ---- REQUISIÇÃO AUTENTICADA ----
  getAuthHeaders() {
    const token = this.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }
}
