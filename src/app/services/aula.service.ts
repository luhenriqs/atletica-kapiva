import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // <--- Importação necessária

export interface AulaRequest {
  data: string;
  horaInicio: string;
  horaFim: string;
  titulo: string;
  turmaId: number;
}

export interface AulaResponse {
  id: number;
  data: string;
  horaInicio: string;
  horaFim: string;
  titulo: string;
  turmaId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private apiUrl = 'http://localhost:8080/api/aulas';

  // Injeção do AuthService
  constructor(private http: HttpClient, private authService: AuthService) {}

  listar(): Observable<AulaResponse[]> {
    return this.http.get<AulaResponse[]>(this.apiUrl, this.authService.getAuthHeaders());
  }

  criar(dados: AulaRequest): Observable<AulaResponse> {
    return this.http.post<AulaResponse>(this.apiUrl, dados, this.authService.getAuthHeaders());
  }

  atualizar(id: number, dados: AulaRequest): Observable<AulaResponse> {
    return this.http.put<AulaResponse>(`${this.apiUrl}/${id}`, dados, this.authService.getAuthHeaders());
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authService.getAuthHeaders());
  }
}