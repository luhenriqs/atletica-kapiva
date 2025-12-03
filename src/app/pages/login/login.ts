import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlunoService, Aluno } from '../../services/aluno.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  selectedRole: 'aluno' | 'funcionario' | null = null;

  // ========================
  // FORMULÁRIO DO ALUNO
  // ========================
  loginFormAluno = new FormGroup({
    codigoAluno: new FormControl('', Validators.required)
  });

  // ========================
  // FORMULÁRIO DO FUNCIONÁRIO
  // ========================
  loginFormFuncionario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private alunoService: AlunoService,
    private authService: AuthService
  ) {}

  // ==========================
  //         LOGIN
  // ==========================
  login() {

    // --------------------------------------
    // LOGIN DO ALUNO
    // --------------------------------------
    if (this.selectedRole === 'aluno') {
      const codigo = this.loginFormAluno.value.codigoAluno;

      if (!codigo || codigo.trim() === '') {
        alert('Informe o código do aluno.');
        return;
      }

      this.alunoService.buscarPorCodigo(codigo.trim()).subscribe({
        next: (aluno: Aluno) => {
          localStorage.setItem('alunoLogado', JSON.stringify(aluno));
          this.router.navigate(['/painel-aluno']);
        },
        error: () => {
          alert('Aluno não encontrado ou código inválido.');
        }
      });

      return;
    }

    // --------------------------------------
    // LOGIN DO FUNCIONÁRIO
    // --------------------------------------
    if (this.selectedRole === 'funcionario') {

      const email = this.loginFormFuncionario.value.email;
      const senha = this.loginFormFuncionario.value.senha;

      if (!email || !senha) {
        alert('Informe e-mail e senha.');
        return;
      }

      this.authService.login({ email, senha }).subscribe({
        next: (resp) => {
          this.authService.salvarLogin(resp);
          this.router.navigate(['/painel-funcionario']);
        },
        error: () => {
          alert('Login inválido.');
        }
      });

      return;
    }

    alert('Selecione uma opção de login (Aluno ou Funcionário).');
  }

  // ==========================
  //    IR PARA CADASTRO
  // ==========================
  goToCadastro() {
    this.router.navigate(['/cadastro-funcionario']);
  }

  // ==========================
  //    SELETOR DE PAPEL
  // ==========================
  selectRole(role: 'aluno' | 'funcionario') {
    this.selectedRole = role;
  }
}
