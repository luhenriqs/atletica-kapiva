import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Matricula {
  id: number;
  dataMatricula: string;
  status: string;
  aluno: {
    id: number;
    nome: string;
    dataNascimento: string;
  };
  turma: {
    id: number;
    nome: string;
    faixaEtariaMinima: number;
    faixaEtariaMaxima: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private apiUrl = 'http://localhost:8080/api/matriculas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.apiUrl);
  }

  matricular(turmaId: number, alunoId: number): Observable<Matricula> {
    return this.http.post<Matricula>(this.apiUrl, { turmaId, alunoId });
  }

  trancar(matriculaId: number): Observable<Matricula> {
    return this.http.put<Matricula>(`${this.apiUrl}/${matriculaId}/trancar`, {});
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
