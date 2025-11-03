import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre.html',
  styleUrls: ['./sobre.css']
})
export class Sobre {
  constructor(private router: Router) {}

  inscrever() {
    this.router.navigate(['/cadastro-aluno']);
  }
}
