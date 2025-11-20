import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  /** Lista todos os professores */
  listar(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.apiUrl);
  }

  /** Busca um professor por id */
  buscarPorId(id: number | string): Observable<Professor> {
    return this.http.get<Professor>(`${this.apiUrl}/${id}`);
  }

  /** Cria um novo professor (POST) */
  criar(dados: { nome: string; cpf: string }): Observable<Professor> {
    return this.http.post<Professor>(this.apiUrl, dados);
  }

  /** Atualiza um professor (PUT) — o backend espera apenas os campos editáveis */
  atualizar(id: number | string, dados: { nome?: string }): Observable<Professor> {
    return this.http.put<Professor>(`${this.apiUrl}/${id}`, dados);
  }

  /** Deleta um professor (DELETE) */
  deletar(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
