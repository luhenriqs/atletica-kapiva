import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // <--- 1. Importação necessária

export interface Professor {
  id?: number;
  nome: string;
  cpf: string;
  dataContratacao?: string; // ISO date string (ex: "2025-11-16")
}

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private apiUrl = 'http://localhost:8080/api/professores';

  // 2. Injeção do AuthService
  constructor(private http: HttpClient, private authService: AuthService) {}

  /** Lista todos os professores */
  listar(): Observable<Professor[]> {
    // 3. Adicionando o header com o token
    return this.http.get<Professor[]>(this.apiUrl, this.authService.getAuthHeaders());
  }

  /** Busca um professor por id */
  buscarPorId(id: number | string): Observable<Professor> {
    return this.http.get<Professor>(`${this.apiUrl}/${id}`, this.authService.getAuthHeaders());
  }

  /** Cria um novo professor (POST) */
  criar(dados: { nome: string; cpf: string }): Observable<Professor> {
    return this.http.post<Professor>(this.apiUrl, dados, this.authService.getAuthHeaders());
  }

  /** Atualiza um professor (PUT) */
  atualizar(id: number | string, dados: { nome?: string }): Observable<Professor> {
    return this.http.put<Professor>(`${this.apiUrl}/${id}`, dados, this.authService.getAuthHeaders());
  }

  /** Deleta um professor (DELETE) */
  deletar(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authService.getAuthHeaders());
  }
}