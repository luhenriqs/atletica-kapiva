import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  private baseUrl = 'http://localhost:8080/api/turmas';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  criar(turma: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, turma);
  }

  atualizar(id: number, turma: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, turma);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  matricular(turmaId: number, alunoId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${turmaId}/matricular`, { alunoId });
  }
}
