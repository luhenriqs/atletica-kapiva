import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadastro-aluno.html',
  styleUrls: ['./cadastro-aluno.css']
})
export class CadastroAluno {
  constructor(private router: Router) {}

  voltar() {
    this.router.navigate(['/login']);
  }
}
