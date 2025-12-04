import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // <--- Importação necessária

export interface Matricula {
  id: number;
  dataMatricula: string;
  status: string;
  codigoAluno: string;
  alunoNome: string;
  trancada: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private apiUrl = 'http://localhost:8080/api/matriculas';

  // Injeção do AuthService no construtor
  constructor(private http: HttpClient, private authService: AuthService) {}

  listar(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.apiUrl, this.authService.getAuthHeaders());
  }

  matricular(turmaId: number, alunoId: number): Observable<Matricula> {
    return this.http.post<Matricula>(this.apiUrl, { turmaId, alunoId }, this.authService.getAuthHeaders());
  }

  trancar(matriculaId: number): Observable<Matricula> {
    return this.http.put<Matricula>(
      `${this.apiUrl}/${matriculaId}/status?status=TRANCADA`,
      {},
      this.authService.getAuthHeaders()
    );
  }

  destrancar(matriculaId: number): Observable<Matricula> {
    return this.http.put<Matricula>(
      `${this.apiUrl}/${matriculaId}/status?status=ATIVA`,
      {},
      this.authService.getAuthHeaders()
    );
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authService.getAuthHeaders());
  }
}