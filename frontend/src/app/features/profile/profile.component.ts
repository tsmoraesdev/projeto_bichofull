import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { HistoryService } from '../../core/services/history.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  usuario = {
    nome: 'Usuário',
    email: '',
    telefone: 'Não informado',
    membroDesde: 'Conta ativa',
    saldo: 0,
    apostasFeitas: 0,
    ganhos: 0,
    perdas: 0,
    totalGanho: 0,
    totalPerdido: 0
  };

  constructor(
    private userService: UserService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.carregarUsuario();
    this.carregarResumo();
  }

  private carregarUsuario(): void {
    this.userService.buscarUsuarioLogado().subscribe({
      next: (usuario) => {
        this.usuario = {
          ...this.usuario,
          nome: usuario?.nome || 'Usuário',
          email: usuario?.email || '',
          saldo: Number(usuario?.saldo ?? this.usuario.saldo)
        };
      },
      error: (error) => {
        console.error('Erro ao carregar usuário:', error);
      }
    });
  }

  private carregarResumo(): void {
    this.historyService.buscarHistorico().subscribe({
      next: (response) => {
        const apostas = Array.isArray(response?.apostas) ? response.apostas : [];

        this.usuario = {
          ...this.usuario,
          apostasFeitas: apostas.length,
          ganhos: Number(response?.resumo?.apostas_premiadas ?? 0),
          perdas: Number(response?.resumo?.apostas_perdidas ?? 0),
          totalGanho: Number(response?.resumo?.total_ganhos ?? 0),
          totalPerdido: Number(response?.resumo?.total_perdas ?? 0)
        };
      },
      error: (error) => {
        console.error('Erro ao carregar resumo do perfil:', error);
      }
    });
  }
}
