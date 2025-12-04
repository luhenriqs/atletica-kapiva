import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // <--- Importação necessária

export interface Funcionario {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  cargo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private apiUrl = 'http://localhost:8080/api/funcionarios';

  // Injeção do AuthService
  constructor(private http: HttpClient, private authService: AuthService) {}

  listar(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl, this.authService.getAuthHeaders());
  }

  buscarPorId(id: number | string): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`, this.authService.getAuthHeaders());
  }

  criar(dados: Funcionario): Observable<Funcionario> {
    // Mesmo sendo permitAll, se for um admin criando outro, o token vai junto (mal não faz)
    return this.http.post<Funcionario>(this.apiUrl, dados, this.authService.getAuthHeaders());
  }

  atualizar(id: number | string, dados: Partial<Funcionario>): Observable<Funcionario> {
    // Rota protegida (/**) - Obrigatório o token
    return this.http.put<Funcionario>(`${this.apiUrl}/${id}`, dados, this.authService.getAuthHeaders());
  }

  deletar(id: number | string): Observable<void> {
    // Rota protegida (/**) - Obrigatório o token
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authService.getAuthHeaders());
  }
}