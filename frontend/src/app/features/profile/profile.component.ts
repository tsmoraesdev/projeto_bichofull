import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  usuario = {
    nome: 'Tatiane Santana',
    email: 'tatiane@email.com',
    telefone: '(92) 99999-9999',
    membroDesde: 'Março de 2026',
    saldo: 1000,
    apostasFeitas: 12,
    ganhos: 3,
    perdas: 9,
    totalGanho: 630,
    totalPerdido: 95
  };
}