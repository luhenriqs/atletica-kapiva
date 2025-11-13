import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Calendario } from './calendario';

@Component({
  selector: 'app-painel-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule, Calendario],
  templateUrl: './painel-funcionario.html',
  styleUrls: ['./painel-funcionario.css']
})
export class PainelFuncionario {
  abaSelecionada: string = 'professores';
  aulas: { titulo: string; data: string; hora: string }[] = [];
  novaAula = { titulo: '', data: '', hora: '' };

  constructor(private router: Router) {
    this.carregarAulas();
  }

  sair() {
    this.router.navigate(['/login']);
  }

  adicionarAula(event: Event) {
    event.preventDefault();


    if (!this.novaAula.titulo.trim() || !this.novaAula.data.trim() || !this.novaAula.hora.trim()) {
      return;
    }


    const horaValida = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(this.novaAula.hora);
    if (!horaValida) {
      alert('⚠️ Horário inválido! Digite um horário entre 00:00 e 23:59.');
      return;
    }


    const conflito = this.aulas.some(
      aula => aula.data === this.novaAula.data && aula.hora === this.novaAula.hora
    );

    if (conflito) {
      alert('⚠️ Já existe uma aula marcada neste dia e horário!');
      return;
    }

    this.aulas.push({ ...this.novaAula });
    this.salvarAulas();
    this.novaAula = { titulo: '', data: '', hora: '' };
  }

  abrirSeletor(event: Event) {
    const input = event.target as HTMLInputElement;
    input.showPicker?.();
  }

  removerAula(index: number) {
    this.aulas.splice(index, 1);
    this.salvarAulas();
  }

  salvarAulas() {
    localStorage.setItem('aulas', JSON.stringify(this.aulas));
  }

  carregarAulas() {
    const dados = localStorage.getItem('aulas');
    if (dados) this.aulas = JSON.parse(dados);
  }
}
