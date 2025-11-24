import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  listar(): Observable<AulaResponse[]> {
    return this.http.get<AulaResponse[]>(this.apiUrl);
  }

  criar(dados: AulaRequest): Observable<AulaResponse> {
    return this.http.post<AulaResponse>(this.apiUrl, dados);
  }

  atualizar(id: number, dados: AulaRequest): Observable<AulaResponse> {
    return this.http.put<AulaResponse>(`${this.apiUrl}/${id}`, dados);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
