import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aula {
  dia: string;
  horario: string;
  professor: string;
}

export interface Aluno {
  id?: number;
  nome: string;
  dataNascimento: string; 
  nomeResponsavel: string;
  cpfResponsavel: string;
  emailResponsavel: string;
  telefoneResponsavel: string;

  // Adicionando sem quebrar nada:
  codigoAluno?: string; 
  aulas?: Aula[];
}

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private apiUrl = 'http://localhost:8080/api/alunos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  criar(aluno: Aluno): Observable<Aluno> {

    const payload = {
      nome: aluno.nome,
      dataNascimento: aluno.dataNascimento,
      nomeResponsavel: aluno.nomeResponsavel,
      cpfResponsavel: aluno.cpfResponsavel.replace(/\D/g, ''),
      emailResponsavel: aluno.emailResponsavel,
      telefoneResponsavel: aluno.telefoneResponsavel.replace(/\D/g, '')
    };

    return this.http.post<Aluno>(this.apiUrl, payload);
  }

  atualizar(id: number, aluno: Aluno): Observable<Aluno> {
    const payload = {
      nome: aluno.nome,
      dataNascimento: aluno.dataNascimento,
      nomeResponsavel: aluno.nomeResponsavel,
      cpfResponsavel: aluno.cpfResponsavel.replace(/\D/g, ''),
      emailResponsavel: aluno.emailResponsavel,
      telefoneResponsavel: aluno.telefoneResponsavel.replace(/\D/g, '')
    };

    return this.http.put<Aluno>(`${this.apiUrl}/${id}`, payload);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarPorId(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`);
  }

  // ------------------------------
  // 🚀 ***NOVAS FUNÇÕES ADICIONADAS***
  // ------------------------------

  // 1) Buscar aluno pelo CÓDIGO DE MATRÍCULA (ex: 2025-0001)
  buscarPorCodigo(codigo: string): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/codigo/${codigo}`);
  }

  // 2) Buscar aulas reais associadas ao aluno
  buscarAulasDoAluno(id: number): Observable<Aula[]> {
    return this.http.get<Aula[]>(`${this.apiUrl}/${id}/aulas`);
  }
}
