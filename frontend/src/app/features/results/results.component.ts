import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HistoricoAposta {
  id: number;
  data: string;
  tipo: 'Grupo' | 'Dezena' | 'Milhar';
  numero: string;
  valor: number;
  status: 'Ganhou' | 'Perdeu';
  premio: number;
}

interface Sorteio {
  data: string;
  premios: string[];
}

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  historicoApostas: HistoricoAposta[] = [
    {
      id: 1,
      data: '26/03/2026',
      tipo: 'Grupo',
      numero: '05',
      valor: 20,
      status: 'Ganhou',
      premio: 360
    },
    {
      id: 2,
      data: '25/03/2026',
      tipo: 'Dezena',
      numero: '45',
      valor: 10,
      status: 'Perdeu',
      premio: 0
    },
    {
      id: 3,
      data: '24/03/2026',
      tipo: 'Milhar',
      numero: '1834',
      valor: 5,
      status: 'Perdeu',
      premio: 0
    },
    {
      id: 4,
      data: '23/03/2026',
      tipo: 'Grupo',
      numero: '12',
      valor: 15,
      status: 'Ganhou',
      premio: 270
    }
  ];

  historicoSorteios: Sorteio[] = [
    {
      data: '26/03/2026',
      premios: ['1834', '4521', '7788', '9012', '3345']
    },
    {
      data: '25/03/2026',
      premios: ['1122', '3344', '5566', '7788', '9900']
    },
    {
      data: '24/03/2026',
      premios: ['1456', '2389', '4501', '6723', '8899']
    }
  ];

  get totalGanhos(): number {
    return this.historicoApostas
      .filter(aposta => aposta.status === 'Ganhou')
      .reduce((total, aposta) => total + aposta.premio, 0);
  }

  get totalPerdas(): number {
    return this.historicoApostas
      .filter(aposta => aposta.status === 'Perdeu')
      .reduce((total, aposta) => total + aposta.valor, 0);
  }

  get quantidadeGanhos(): number {
    return this.historicoApostas.filter(aposta => aposta.status === 'Ganhou').length;
  }

  get quantidadePerdas(): number {
    return this.historicoApostas.filter(aposta => aposta.status === 'Perdeu').length;
  }
}