import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro-funcionario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-funcionario.html',
  styleUrls: ['./cadastro-funcionario.css']
})
export class CadastroFuncionario {

  cadastroForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    rgCpf: new FormControl('', Validators.required),
    dataNascimento: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  cadastrar() {
    if (this.cadastroForm.invalid) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    // Montar objeto DTO corretamente
    const funcionario = {
      nome: this.cadastroForm.value.nome,
      rgCpf: this.cadastroForm.value.rgCpf,
      dataNascimento: this.cadastroForm.value.dataNascimento
        ? new Date(this.cadastroForm.value.dataNascimento).toISOString().split('T')[0]
        : '',
      endereco: this.cadastroForm.value.endereco,
      telefone: this.cadastroForm.value.telefone,
      email: this.cadastroForm.value.email,
      senha: this.cadastroForm.value.senha
    };

    this.authService.cadastrar(funcionario).subscribe({
      next: (res) => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);

        // Pegar mensagem de erro do backend, se existir
        const msg = err.error?.message || 'Erro ao cadastrar. Verifique os dados.';
        alert(msg);
      }
    });
  }

  voltar() {
    this.router.navigate(['/login']);
  }
}
