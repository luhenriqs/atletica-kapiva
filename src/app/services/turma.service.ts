import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // <--- Importação necessária

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  private baseUrl = 'http://localhost:8080/api/turmas';

  // Injeção do AuthService
  constructor(private http: HttpClient, private authService: AuthService) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, this.authService.getAuthHeaders());
  }

  criar(turma: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, turma, this.authService.getAuthHeaders());
  }

  atualizar(id: number, turma: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, turma, this.authService.getAuthHeaders());
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, this.authService.getAuthHeaders());
  }

  matricular(turmaId: number, alunoId: number): Observable<any> {
    // A rota de matricular também precisa de autenticação
    return this.http.post<any>(`${this.baseUrl}/${turmaId}/matricular`, { alunoId }, this.authService.getAuthHeaders());
  }
}