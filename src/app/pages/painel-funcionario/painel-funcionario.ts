import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './painel-funcionario.html',
  styleUrls: ['./painel-funcionario.css']
})
export class PainelFuncionario {
  abaSelecionada: string = 'professores';
  professores: any[] = [];
  novoProfessor = { nome: '', modalidade: '' };

  constructor(private router: Router) {
    this.carregarProfessores();
  }

  sair() {
    this.router.navigate(['/login']);
  }

  adicionarProfessor(event: Event) {
    event.preventDefault();
    if (!this.novoProfessor.nome.trim() || !this.novoProfessor.modalidade.trim()) return;

    this.professores.push({ ...this.novoProfessor });
    this.salvarProfessores();
    this.novoProfessor = { nome: '', modalidade: '' };
  }

  removerProfessor(index: number) {
    this.professores.splice(index, 1);
    this.salvarProfessores();
  }

  salvarProfessores() {
    localStorage.setItem('professores', JSON.stringify(this.professores));
  }

  carregarProfessores() {
    const dados = localStorage.getItem('professores');
    if (dados) this.professores = JSON.parse(dados);
  }
}
