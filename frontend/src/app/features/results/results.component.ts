import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HistoryService } from '../../core/services/history.service';

type StatusHistorico = 'Aguardando' | 'Ganhou' | 'Perdeu';

interface HistoricoAposta {
  id: number;
  data: string;
  tipo: 'Grupo' | 'Dezena' | 'Milhar';
  numero: string;
  valor: number;
  status: StatusHistorico;
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
export class ResultsComponent implements OnInit, OnDestroy {
  historicoApostas: HistoricoAposta[] = [];
  historicoSorteios: Sorteio[] = [];

  totalGanhos = 0;
  totalPerdas = 0;
  quantidadeGanhos = 0;
  quantidadePerdas = 0;

  private historicoSubscription?: Subscription;

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.carregarHistorico();
    this.historicoSubscription = this.historyService.historicoAtualizado$.subscribe(() => {
      this.carregarHistorico();
    });
  }

  ngOnDestroy(): void {
    this.historicoSubscription?.unsubscribe();
  }

  carregarHistorico(): void {
    this.historyService.buscarHistorico().subscribe({
      next: (response) => {
        this.totalGanhos = Number(response?.resumo?.total_ganhos ?? 0);
        this.totalPerdas = Number(response?.resumo?.total_perdas ?? 0);
        this.quantidadeGanhos = Number(response?.resumo?.apostas_premiadas ?? 0);
        this.quantidadePerdas = Number(response?.resumo?.apostas_perdidas ?? 0);

        this.historicoApostas = (response?.apostas ?? []).map((aposta: any) => ({
          id: Number(aposta.id),
          data: this.formatarData(aposta.data_aposta),
          tipo: this.converterTipo(aposta.tipo_aposta),
          numero: aposta.numero,
          valor: Number(aposta.valor_apostado),
          status: this.converterStatus(aposta.status),
          premio: Number(aposta.premio ?? 0)
        }));

        this.historicoSorteios = (response?.sorteios ?? []).map((sorteio: any) => ({
          data: this.formatarData(sorteio.data_sorteio),
          premios: sorteio.premios ?? []
        }));
      },
      error: (error) => {
        console.error('Erro ao carregar histórico:', error);
        this.historicoApostas = [];
        this.historicoSorteios = [];
        this.totalGanhos = 0;
        this.totalPerdas = 0;
        this.quantidadeGanhos = 0;
        this.quantidadePerdas = 0;
      }
    });
  }

  private converterTipo(tipo: string): 'Grupo' | 'Dezena' | 'Milhar' {
    if (tipo === 'GRUPO') return 'Grupo';
    if (tipo === 'DEZENA') return 'Dezena';
    return 'Milhar';
  }

  private converterStatus(status: string): StatusHistorico {
    if (status === 'GANHOU') return 'Ganhou';
    if (status === 'PERDEU') return 'Perdeu';
    return 'Aguardando';
  }

  private formatarData(data: string): string {
    if (!data) return '';

    const dataObj = new Date(data);

    if (isNaN(dataObj.getTime())) {
      return data;
    }

    return dataObj.toLocaleDateString('pt-BR');
  }
}
