import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {
  modalPerfilAberto = false;

  usuario = {
    nome: 'Tatiane Santana',
    email: 'tatiane@email.com',
    saldo: 1000
  };

  constructor(private router: Router) {}

  abrirModalPerfil() {
    this.modalPerfilAberto = true;
  }

  fecharModalPerfil() {
    this.modalPerfilAberto = false;
  }

  logout() {
    this.fecharModalPerfil();
    this.router.navigate(['/']);
  }
}