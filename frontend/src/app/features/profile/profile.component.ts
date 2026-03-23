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
    saldo: 1000,
    apostasFeitas: 12,
    ganhos: 3,
    membroDesde: 'Março de 2026'
  };
}