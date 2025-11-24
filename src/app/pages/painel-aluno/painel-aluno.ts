import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-painel-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './painel-aluno.html',
  styleUrls: ['./painel-aluno.css']
})
export class PainelAluno implements OnInit {

  aluno: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Pegar o aluno completo do localStorage
    const alunoData = localStorage.getItem('alunoLogado');

    if (alunoData) {
      this.aluno = JSON.parse(alunoData);
    } else {
      // Se não houver aluno logado, volta para o login
      this.router.navigate(['/login']);
    }
  }

  sair() {
    localStorage.removeItem('alunoLogado');
    this.router.navigate(['/login']);
  }
}
