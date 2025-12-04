import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // <--- Importação nova

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
  codigoAluno?: string;
  aulas?: Aula[];
}

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private apiUrl = 'http://localhost:8080/api/alunos';

  // Injetamos o AuthService aqui no construtor
  constructor(private http: HttpClient, private authService: AuthService) { }

  listar(): Observable<Aluno[]> {
    // Adicionamos os headers com o token aqui
    return this.http.get<Aluno[]>(this.apiUrl, this.authService.getAuthHeaders());
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

    // Passamos o token junto com o payload
    return this.http.post<Aluno>(this.apiUrl, payload, this.authService.getAuthHeaders());
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

    return this.http.put<Aluno>(`${this.apiUrl}/${id}`, payload, this.authService.getAuthHeaders());
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authService.getAuthHeaders());
  }

  buscarPorId(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`, this.authService.getAuthHeaders());
  }

  // ------------------------------
  // 🚀 NOVAS FUNÇÕES ADICIONADAS
  // ------------------------------

  buscarPorCodigo(codigo: string): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/codigo/${codigo}`, this.authService.getAuthHeaders());
  }

  buscarAulasDoAluno(id: number): Observable<Aula[]> {
    return this.http.get<Aula[]>(`${this.apiUrl}/${id}/aulas`, this.authService.getAuthHeaders());
  }
}