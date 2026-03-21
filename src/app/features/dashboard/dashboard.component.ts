import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userName = 'Tatiane';
  saldo = 1000;
  totalApostas = 12;
  totalGanhos = 3;
  ultimoResultado = '1º prêmio: 1834';

  apostasRecentes = [
    { tipo: 'Grupo', numero: '13', valor: 20, status: 'Pendente' },
    { tipo: 'Dezena', numero: '45', valor: 10, status: 'Ganhou' },
    { tipo: 'Milhar', numero: '1834', valor: 5, status: 'Perdeu' }
  ];

  atalhos = [
    { titulo: 'Nova aposta', descricao: 'Criar uma nova aposta agora' },
    { titulo: 'Ver resultados', descricao: 'Consultar sorteios recentes' },
    { titulo: 'Meu perfil', descricao: 'Ver dados da conta' }
  ];
}