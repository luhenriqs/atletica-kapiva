import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './painel-aluno.html',
  styleUrls: ['./painel-aluno.css']
})
export class PainelAluno {
  constructor(private router: Router) {}

  sair() {
    this.router.navigate(['/login']);
  }
}
