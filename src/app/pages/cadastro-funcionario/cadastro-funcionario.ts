import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-funcionario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadastro-funcionario.html',
  styleUrls: ['./cadastro-funcionario.css']
})
export class CadastroFuncionario {
  constructor(private router: Router) {}

  voltar() {
    this.router.navigate(['/login']);
  }
}
