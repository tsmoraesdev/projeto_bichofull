import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bets.component.html',
  styleUrl: './bets.component.scss'
})
export class BetsComponent {
  tipoAposta = 'Grupo';
  numero = '';
  valor = 0;

  ultimoSorteio: string[] = [];
  resultadoAposta = '';

  historico = [
    { tipo: 'Dezena', numero: '45', valor: 10, status: 'Ganhou' },
    { tipo: 'Milhar', numero: '1834', valor: 5, status: 'Perdeu' }
  ];

  apostar() {
    if (!this.numero || this.valor <= 0) {
      alert('Preencha os dados da aposta.');
      return;
    }

    this.ultimoSorteio = this.gerarSorteio();

    const ganhou = this.verificarResultado(this.numero, this.ultimoSorteio);

    const status = ganhou ? 'Ganhou' : 'Perdeu';
    this.resultadoAposta = status;

    this.historico.unshift({
      tipo: this.tipoAposta,
      numero: this.numero,
      valor: this.valor,
      status
    });

    this.numero = '';
    this.valor = 0;
  }

  gerarSorteio(): string[] {
    const premios: string[] = [];

    for (let i = 0; i < 5; i++) {
      const numero = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0');
      premios.push(numero);
    }

    return premios;
  }

  verificarResultado(numeroAposta: string, sorteio: string[]): boolean {
    if (this.tipoAposta === 'Milhar') {
      return sorteio[0] === numeroAposta.padStart(4, '0');
    }

    if (this.tipoAposta === 'Dezena') {
      return sorteio[0].slice(-2) === numeroAposta.padStart(2, '0');
    }

    if (this.tipoAposta === 'Grupo') {
      return Math.random() > 0.5;
    }

    return false;
  }
}