import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  selectedRole: 'aluno' | 'funcionario' | null = null;

  constructor(private router: Router) {}

  selectRole(role: 'aluno' | 'funcionario') {
    this.selectedRole = role;
  }

  goToCadastro() {
    if (this.selectedRole === 'aluno') {
      this.router.navigate(['/cadastro-aluno']);
    } else if (this.selectedRole === 'funcionario') {
      this.router.navigate(['/cadastro-funcionario']);
    }
  }

  login() {
    if (this.selectedRole === 'aluno') {
      this.router.navigate(['/painel-aluno']);
    } else if (this.selectedRole === 'funcionario') {
      this.router.navigate(['/painel-funcionario']);
    }
  }
}
