import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      alert('Você precisa estar logado para acessar esta página.');
      this.router.navigate(['/login']);
      return false;
    }
  }

  constructor(private router: Router) {}
}
