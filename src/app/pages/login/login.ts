import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AlunoService, Aluno } from '../../services/aluno.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  selectedRole: 'aluno' | 'funcionario' | null = null;

  loginForm = new FormGroup({
    codigoAluno: new FormControl('')
  });

  constructor(
    private router: Router,
    private alunoService: AlunoService
  ) {}

  login() {
    if (this.selectedRole === 'aluno') {
      const codigo = this.loginForm.value.codigoAluno?.trim();
      if (!codigo) {
        alert('Informe o código do aluno');
        return;
      }

      // Chamada ao backend para buscar aluno pelo código
      this.alunoService.buscarPorCodigo(codigo).subscribe({
        next: (aluno: Aluno) => {
          // Salva o aluno completo no localStorage
          localStorage.setItem('alunoLogado', JSON.stringify(aluno));
          // Redireciona para o painel do aluno
          this.router.navigate(['/painel-aluno']);
        },
        error: () => {
          alert('Aluno não encontrado ou código inválido');
        }
      });

    } else if (this.selectedRole === 'funcionario') {
      // Login simplificado para funcionário
      const funcionarioMock = { nome: 'Funcionário' };
      localStorage.setItem('funcionarioLogado', JSON.stringify(funcionarioMock));
      this.router.navigate(['/painel-funcionario']);
    }
  }

  goToCadastro() {
    this.router.navigate(['/cadastro-funcionario']);
  }

  selectRole(role: 'aluno' | 'funcionario') {
    this.selectedRole = role;
  }
}
