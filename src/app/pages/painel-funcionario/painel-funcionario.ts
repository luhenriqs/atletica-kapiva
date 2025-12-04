import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Calendario } from './calendario';
import { AulaService } from '../../services/aula.service';
import { ProfessorService } from '../../services/professor.service';
import { AlunoService, Aluno } from '../../services/aluno.service';
import { TurmaService } from '../../services/turma.service';
import { MatriculaService, Matricula } from '../../services/matricula.service';

@Component({
selector: 'app-painel-funcionario',
standalone: true,
imports: [CommonModule, FormsModule, Calendario],
templateUrl: './painel-funcionario.html',
styleUrls: ['./painel-funcionario.css']
})
export class PainelFuncionario {

abaSelecionada: 'professores' | 'aulas' | 'alunos' | 'gerenciarProfessores' | 'turmas' | 'matriculas' = 'professores';

/* ---- TURMAS ---- */
turmas: any[] = [];
novaTurma: any = { 
  nome: '', 
  faixaEtariaMinima: null,
  faixaEtariaMaxima: null,
  professorId: null,
  limiteAlunos: null,
  alunoIds: [] 
};turmaSelecionadaId: number | null = null;
turmaEditando: any = null;

/* ---- AULAS ---- */
aulas: {
  id: number;
  titulo: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  turmaId?: number;
}[] = [];

novaAula = { titulo: '', data: '', horaInicio: '', horaFim: '', turmaId: null };
aulaEditando: any = null;
modoEdicao: boolean = false;

/* ---- PROFESSORES ---- */
professores: any[] = [];
novoProfessor = { nome: '', cpf: '', dataContratacao: '' };
professorEditando: any = null;
cpfInvalido: boolean = false;

/* ---- ALUNOS ---- */
alunos: Aluno[] = [];
alunosFiltrados: Aluno[] = [];
buscaAluno: string = '';
novoAluno: Aluno = { nome: '', dataNascimento: '', nomeResponsavel: '', cpfResponsavel: '', emailResponsavel: '', telefoneResponsavel: '' };
alunoEditando: Aluno | null = null;
cpfResponsavelInvalido: boolean = false;

/* ---- MATRÍCULAS ---- */
matriculas: Matricula[] = [];

constructor(
private router: Router,
private aulaService: AulaService,
private professorService: ProfessorService,
private alunoService: AlunoService,
private turmaService: TurmaService,
private matriculaService: MatriculaService
) {
this.carregarAulas();
this.carregarProfessores();
this.carregarAlunos();
this.carregarTurmas();
this.carregarMatriculas();
}

/* ================= NAVEGAÇÃO ================= */
sair() { this.router.navigate(['/login']); }

/* ================= TURMAS ================= */
carregarTurmas() {
this.turmaService.listar().subscribe({
next: dados => this.turmas = dados,
error: err => console.error('Erro ao carregar turmas:', err)
});
}

adicionarTurma(event: Event) {
event.preventDefault();
this.turmaService.criar(this.novaTurma).subscribe({
next: () => {
alert('Turma cadastrada!');
this.carregarTurmas();
this.cancelarEdicaoTurma();
},
error: err => alert('Erro ao cadastrar turma: ' + err.message)
});
}

removerTurma(id?: number) {
if (!id || !confirm('Deseja remover esta turma?')) return;
this.turmaService.deletar(id).subscribe({
next: () => { alert('Turma removida!'); this.carregarTurmas(); },
error: err => alert('Erro ao remover turma: ' + err.message)
});
}

prepararEdicaoTurma(turma: any) {
  this.turmaEditando = { ...turma };
  this.novaTurma = { ...turma };
}

salvarEdicaoTurma() {
if (!this.turmaEditando) return;
this.turmaService.atualizar(this.turmaEditando.id, this.novaTurma).subscribe({
next: () => { alert('Turma atualizada!'); this.carregarTurmas(); this.cancelarEdicaoTurma(); },
error: err => alert('Erro ao atualizar turma: ' + err.message)
});
}

cancelarEdicaoTurma() {
this.turmaEditando = null;
this.novaTurma = { 
  nome: '', 
  faixaEtariaMinima: null,
  faixaEtariaMaxima: null,
  professorId: null,
  limiteAlunos: null,
  alunoIds: []
};
}

/* ================= MATRÍCULAS ================= */
matricularAluno(turmaId?: number | null, alunoId?: number) {
if (!turmaId || !alunoId) return;
this.matriculaService.matricular(turmaId, alunoId).subscribe({
next: () => { alert('Aluno matriculado!'); this.carregarMatriculas(); },
error: err => alert('Erro ao matricular aluno: ' + err.message)
});

}
trancarOuDestrancarMatricula(matricula: Matricula) {
  if (!matricula.id) return;

  // usa o campo status normalizado para decidir a ação
  const estaAtiva = (matricula.status || '').toString().toUpperCase() === 'ATIVA';
  const acao = estaAtiva ? 'trancar' : 'destrancar';

  if (!confirm(`Deseja ${acao} esta matrícula?`)) return;

  let observable;
  if (estaAtiva) {
    observable = this.matriculaService.trancar(matricula.id);
  } else {
    observable = this.matriculaService.destrancar(matricula.id);
  }

  observable.subscribe({
    next: (updated) => {
      // atualiza a lista para refletir o status real do backend
      this.carregarMatriculas();

      // mensagem correta (particípio)
      const mensagem = estaAtiva ? 'Matrícula trancada!' : 'Matrícula destrancada!';
      alert(mensagem);
    },
    error: (err: any) => alert(`Erro ao ${acao} matrícula: ` + (err?.message || err))
  });
}


  
  
carregarMatriculas() {
  this.matriculaService.listar().subscribe({
    next: dados => {
      // garante que temos as propriedades esperadas e cria campo booleano 'trancada'
      this.matriculas = dados.map(m => ({
        ...m,
        alunoNome: m.alunoNome || '',
        codigoAluno: m.codigoAluno || '',
        // normaliza o status e cria trancada como boolean
        status: (m.status || '').toString(),
        trancada: ((m.status || '').toString().toUpperCase() === 'TRANCADA')
      }));
    },
    error: (err: any) => console.error('Erro ao carregar matrículas:', err)
  });
}

deletarMatricula(id: number) {
if (!id || !confirm('Deseja excluir esta matrícula?')) return;
this.matriculaService.deletar(id).subscribe({
next: () => { alert('Matrícula deletada!'); this.carregarMatriculas(); },
error: err => alert('Erro ao deletar matrícula: ' + err.message)
});
}

/* ================= ALUNOS ================= */
filtrarAlunos() {
const termo = this.buscaAluno.toLowerCase().trim();
this.alunosFiltrados = this.alunos.filter(a => a.nome.toLowerCase().includes(termo));
}

carregarAlunos() {
this.alunoService.listar().subscribe({
next: dados => { this.alunos = dados; this.alunosFiltrados = dados; },
error: err => console.error('Erro ao carregar alunos:', err)
});
}

adicionarAluno(event: Event) {
event.preventDefault();
if (!this.novoAluno.nome.trim() || !this.novoAluno.dataNascimento.trim() || !this.novoAluno.nomeResponsavel.trim() || !this.novoAluno.cpfResponsavel.trim() || !this.novoAluno.emailResponsavel.trim() || !this.novoAluno.telefoneResponsavel.trim()) {
alert('Preencha todos os campos obrigatórios!');
return;
}
this.alunoService.criar(this.novoAluno).subscribe({
next: alunoCriado => {
alert('Aluno cadastrado!');
this.carregarAlunos();
const novaMatricula: Matricula = { 
  id: this.gerarIdMatricula(),
  dataMatricula: new Date().toISOString(),
  status: 'Ativa',
  codigoAluno: String(alunoCriado.id),
  alunoNome: alunoCriado.nome,
  trancada: false  
};

this.matriculas.push(novaMatricula);
this.novoAluno = { nome: '', dataNascimento: '', nomeResponsavel: '', cpfResponsavel: '', emailResponsavel: '', telefoneResponsavel: '' };
this.cpfResponsavelInvalido = false;
},
error: err => alert('Erro ao cadastrar aluno: ' + err.message)
});
}

prepararEdicaoAluno(aluno: Aluno) { this.alunoEditando = { ...aluno }; this.novoAluno = { ...aluno }; }

salvarEdicaoAluno() {
if (!this.alunoEditando || !this.alunoEditando.id) return;
this.alunoService.atualizar(this.alunoEditando.id, this.novoAluno).subscribe({
next: () => {
alert('Aluno atualizado!');
this.carregarAlunos();
this.alunoEditando = null;
this.novoAluno = { nome: '', dataNascimento: '', nomeResponsavel: '', cpfResponsavel: '', emailResponsavel: '', telefoneResponsavel: '' };
this.cpfResponsavelInvalido = false;
},
error: err => alert('Erro ao atualizar aluno: ' + err.message)
});
}

cancelarEdicaoAluno() { this.alunoEditando = null; this.novoAluno = { nome: '', dataNascimento: '', nomeResponsavel: '', cpfResponsavel: '', emailResponsavel: '', telefoneResponsavel: '' }; this.cpfResponsavelInvalido = false; }

removerAluno(id?: number) {
  console.log('Tentando deletar aluno com ID:', id);

  if (!id) {
    alert('Erro: ID inválido ou não fornecido.');
    return;
  }

  if (!confirm('Tem certeza que deseja remover este aluno?')) return;

  this.alunoService.deletar(id).subscribe({
    next: () => {
      console.log('Backend retornou sucesso (200 OK).');
      alert('Aluno removido com sucesso!');

     
      this.alunos = this.alunos.filter(a => a.id != id);
      this.alunosFiltrados = this.alunosFiltrados.filter(a => a.id != id);

      
      this.carregarAlunos();
    },
    error: (err) => {
      console.error('Erro vindo do backend:', err);
      alert('Erro ao remover: ' + (err.error?.message || err.message));
    }
  });
  
  }

/* ================= PROFESSORES ================= */
carregarProfessores() {
this.professorService.listar().subscribe({ next: dados => this.professores = dados, error: err => console.error('Erro:', err) });
}

adicionarProfessor(event: Event) {
event.preventDefault();
if (this.cpfInvalido) { alert("CPF inválido!"); return; }
const prof = { ...this.novoProfessor };
if (!prof.dataContratacao) prof.dataContratacao = new Date().toISOString().split('T')[0];
this.professorService.criar(prof).subscribe({
next: () => { alert('Professor cadastrado!'); this.carregarProfessores(); this.novoProfessor = { nome: '', cpf: '', dataContratacao: '' }; },
error: err => alert('Erro ao cadastrar professor: ' + err.message)
});
}

prepararEdicaoProfessor(prof: any) { this.professorEditando = { ...prof }; this.novoProfessor = { nome: prof.nome, cpf: prof.cpf, dataContratacao: prof.dataContratacao }; }

salvarEdicaoProfessor() {
if (!this.professorEditando || this.cpfInvalido) { alert("CPF inválido!"); return; }
this.professorService.atualizar(this.professorEditando.id, this.novoProfessor).subscribe({
next: () => { alert('Professor atualizado!'); this.carregarProfessores(); this.professorEditando = null; this.novoProfessor = { nome: '', cpf: '', dataContratacao: '' }; },
error: err => alert('Erro ao atualizar professor: ' + err.message)
});
}

cancelarEdicaoProfessor() { this.professorEditando = null; this.novoProfessor = { nome: '', cpf: '', dataContratacao: '' }; }

aplicarMascaraCPF() {
let cpf = this.novoProfessor.cpf || '';
cpf = cpf.replace(/\D/g, '');
if (cpf.length > 3 && cpf.length <= 6) cpf = cpf.replace(/(\d{3})(\d+)/, '$1.$2');
else if (cpf.length > 6 && cpf.length <= 9) cpf = cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
else if (cpf.length > 9) cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
this.novoProfessor.cpf = cpf;
const numeros = cpf.replace(/\D/g, '');
this.cpfInvalido = numeros.length > 0 && numeros.length !== 11;
}

aplicarMascaraCPFResponsavel() {
let cpf = this.novoAluno.cpfResponsavel || '';
cpf = cpf.replace(/\D/g, '');
if (cpf.length > 3 && cpf.length <= 6) cpf = cpf.replace(/(\d{3})(\d+)/, '$1.$2');
else if (cpf.length > 6 && cpf.length <= 9) cpf = cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
else if (cpf.length > 9) cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
this.novoAluno.cpfResponsavel = cpf;
const numeros = cpf.replace(/\D/g, '');
this.cpfResponsavelInvalido = numeros.length > 0 && numeros.length !== 11;
}

/* ================= AULAS ================= */
carregarAulas() {
  this.aulaService.listar().subscribe({
    next: dados => this.aulas = dados,
    error: err => console.error('Erro ao carregar aulas:', err)
  });
}

adicionarAula(event: Event) {
  event.preventDefault();

  // validação de horários
  const horaInicioValida = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(this.novaAula.horaInicio);
  const horaFimValida = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(this.novaAula.horaFim);

  if (!horaInicioValida || !horaFimValida) {
    alert('⚠️ Horário inválido!');
    return;
  }

  if (!this.novaAula.turmaId) {
    alert('Selecione a turma!');
    return;
  }

  const turmaSelecionada = this.turmas.find(t => t.id === Number(this.novaAula.turmaId));

  if (!turmaSelecionada) {
    alert('Turma inválida!');
    return;
  }

  const professor = this.professores.find(p => p.id === turmaSelecionada.professorId);

  // 🔥 TÍTULO FINAL CORRIGIDO
  const tituloAula = `${turmaSelecionada?.nome || 'Turma'} — Prof: ${professor?.nome || 'Sem professor'} — ${this.novaAula.horaInicio || '--:--'} às ${this.novaAula.horaFim || '--:--'}`;

  const novaAula = {
    titulo: tituloAula,
    data: this.novaAula.data,
    horaInicio: this.novaAula.horaInicio,
    horaFim: this.novaAula.horaFim,
    turmaId: this.novaAula.turmaId
  };

  this.aulaService.criar(novaAula).subscribe({
    next: () => {
      alert('Aula cadastrada!');
      this.carregarAulas();
      this.novaAula = { titulo: '', data: '', horaInicio: '', horaFim: '', turmaId: null };
    },
    error: err => alert('Erro ao cadastrar aula: ' + err.message)
  });
}

removerAula(id: number) {
  if (!confirm('Deseja remover esta aula?')) return;

  this.aulaService.deletar(id).subscribe({
    next: () => {
      alert('Aula removida!');
      this.carregarAulas();
    },
    error: err => alert('Erro ao remover aula: ' + err.message)
  });
}

abrirSeletor(event: Event) {
  (event.target as HTMLInputElement).showPicker?.();
}

prepararEdicao(aula: any) {
  this.aulaEditando = { ...aula };
  this.modoEdicao = true;

  this.novaAula = {
    titulo: aula.titulo,
    data: aula.data,
    horaInicio: aula.horaInicio || '',
    horaFim: aula.horaFim || '',
    turmaId: aula.turmaId || null
  };
}

salvarEdicao() {
  if (!this.aulaEditando) return;

  if (!this.novaAula.turmaId) {
    alert('Selecione a turma!');
    return;
  }

  const turmaSelecionada = this.turmas.find(t => t.id === this.novaAula.turmaId);
  if (!turmaSelecionada) {
    alert('Turma inválida!');
    return;
  }

  const professor = this.professores.find(p => p.id === turmaSelecionada.professorId);

  // 🔥 TÍTULO FINAL CORRIGIDO NO UPDATE TAMBÉM
  const tituloAtualizado = 
    `${turmaSelecionada.nome} — Prof: ${professor?.nome || 'Sem professor'} — ${this.novaAula.horaInicio} às ${this.novaAula.horaFim}`;

  const atualizado = {
    id: this.aulaEditando.id,
    titulo: tituloAtualizado,
    data: this.novaAula.data,
    horaInicio: this.novaAula.horaInicio,
    horaFim: this.novaAula.horaFim,
    turmaId: this.novaAula.turmaId
  };

  this.aulaService.atualizar(atualizado.id, atualizado).subscribe({
    next: () => {
      alert('Aula atualizada!');
      this.carregarAulas();
      this.aulaEditando = null;
      this.novaAula = { titulo: '', data: '', horaInicio: '', horaFim: '', turmaId: null };
      this.modoEdicao = false;
    },
    error: err => alert('Erro ao atualizar aula: ' + err.message)
  });
}

cancelarEdicaoAula() {
  this.modoEdicao = false;
  this.aulaEditando = null;
  this.novaAula = { titulo: '', data: '', horaInicio: '', horaFim: '', turmaId: null };
}

/* ================= PROFESSORES - REMOVER ================= */
removerProfessor(id?: number) {
  if (!id || !confirm('Deseja remover este professor?')) return;

  this.professorService.deletar(id).subscribe({
    next: () => {
      alert('Professor removido!');
      this.carregarProfessores();
    },
    error: err => alert('Erro ao remover professor: ' + err.message)
  });
}

/* ================= MATRÍCULA - ID TEMP ================= */
gerarIdMatricula(): number {
  return this.matriculas.length > 0
    ? Math.max(...this.matriculas.map(m => m.id)) + 1
    : 1;
}

}
