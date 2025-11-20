import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aluno {
  id?: number;
  nome: string;
  dataNascimento: string; // deve ser YYYY-MM-DD
  nomeResponsavel: string;
  cpfResponsavel: string;
  emailResponsavel: string;
  telefoneResponsavel: string;
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
      dataNascimento: aluno.dataNascimento, // precisa estar em YYYY-MM-DD
      nomeResponsavel: aluno.nomeResponsavel,
      cpfResponsavel: aluno.cpfResponsavel.replace(/\D/g, ''), // remove máscara
      emailResponsavel: aluno.emailResponsavel,
      telefoneResponsavel: aluno.telefoneResponsavel.replace(/\D/g, '') // remove máscara
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
}
