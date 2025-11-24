import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre.html',
  styleUrls: ['./sobre.css']
})
export class Sobre {

  inscrever() {
    // Abre o site do Senac em uma nova aba
    window.open('https://www.sp.senac.br/', '_blank');
  }

}
