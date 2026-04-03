import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BetsService } from '../../core/services/bets.service';
import { HistoryService } from '../../core/services/history.service';

type TipoAposta = 'Grupo' | 'Dezena' | 'Milhar';
type StatusApostaExibicao = 'Aguardando' | 'Ganhou' | 'Perdeu';

interface Aposta {
  id: number;
  tipo: TipoAposta;
  numero: string;
  valor: number;
  selecionada: boolean;
  status: StatusApostaExibicao;
  premio?: number;
}

interface Animal {
  nome: string;
  grupo: string;
  dezenas: string[];
  imagem: string;
}

@Component({
  selector: 'app-bets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss']
})
export class BetsComponent implements OnInit {
  saldo = 1000;

  tipoAposta: TipoAposta = 'Grupo';
  numero = '';
  valor: number | null = null;

  apostas: Aposta[] = [];
  ultimoSorteio: string[] = [];
  mensagemResultado = '';

  animais: Animal[] = [
    { nome: 'Avestruz', grupo: '01', dezenas: ['01', '02', '03', '04'], imagem: '/avestruz.png' },
    { nome: 'Águia', grupo: '02', dezenas: ['05', '06', '07', '08'], imagem: '/aguia.png' },
    { nome: 'Burro', grupo: '03', dezenas: ['09', '10', '11', '12'], imagem: '/burro.png' },
    { nome: 'Borboleta', grupo: '04', dezenas: ['13', '14', '15', '16'], imagem: '/borboleta.png' },
    { nome: 'Cachorro', grupo: '05', dezenas: ['17', '18', '19', '20'], imagem: '/cachorro.png' },
    { nome: 'Cabra', grupo: '06', dezenas: ['21', '22', '23', '24'], imagem: '/cabra.png' },
    { nome: 'Carneiro', grupo: '07', dezenas: ['25', '26', '27', '28'], imagem: '/carneiro.png' },
    { nome: 'Camelo', grupo: '08', dezenas: ['29', '30', '31', '32'], imagem: '/camelo.png' },
    { nome: 'Cobra', grupo: '09', dezenas: ['33', '34', '35', '36'], imagem: '/cobra.png' },
    { nome: 'Coelho', grupo: '10', dezenas: ['37', '38', '39', '40'], imagem: '/coelho.png' },
    { nome: 'Cavalo', grupo: '11', dezenas: ['41', '42', '43', '44'], imagem: '/cavalo.png' },
    { nome: 'Elefante', grupo: '12', dezenas: ['45', '46', '47', '48'], imagem: '/elefante.png' },
    { nome: 'Galo', grupo: '13', dezenas: ['49', '50', '51', '52'], imagem: '/galo.png' },
    { nome: 'Gato', grupo: '14', dezenas: ['53', '54', '55', '56'], imagem: '/gato.png' },
    { nome: 'Jacaré', grupo: '15', dezenas: ['57', '58', '59', '60'], imagem: '/jacare.png' },
    { nome: 'Leão', grupo: '16', dezenas: ['61', '62', '63', '64'], imagem: '/leao.png' },
    { nome: 'Macaco', grupo: '17', dezenas: ['65', '66', '67', '68'], imagem: '/macaco.png' },
    { nome: 'Porco', grupo: '18', dezenas: ['69', '70', '71', '72'], imagem: '/porco.png' },
    { nome: 'Pavão', grupo: '19', dezenas: ['73', '74', '75', '76'], imagem: '/pavao.png' },
    { nome: 'Peru', grupo: '20', dezenas: ['77', '78', '79', '80'], imagem: '/peru.png' },
    { nome: 'Touro', grupo: '21', dezenas: ['81', '82', '83', '84'], imagem: '/touro.png' },
    { nome: 'Tigre', grupo: '22', dezenas: ['85', '86', '87', '88'], imagem: '/tigre.png' },
    { nome: 'Urso', grupo: '23', dezenas: ['89', '90', '91', '92'], imagem: '/urso.png' },
    { nome: 'Veado', grupo: '24', dezenas: ['93', '94', '95', '96'], imagem: '/veado.png' },
    { nome: 'Vaca', grupo: '25', dezenas: ['97', '98', '99', '00'], imagem: '/vaca.png' }
  ];

  constructor(
    private betsService: BetsService,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.carregarApostas();
  }

  get apostasPendentes(): Aposta[] {
    return this.apostas.filter(aposta => aposta.status === 'Aguardando');
  }

  adicionarDinheiro(): void {
    this.saldo += 100;
    alert('R$ 100,00 adicionados ao saldo.');
  }

  registrarAposta(): void {
    const numeroDigitado = String(this.numero ?? '').trim();
    const valorNumerico = Number(this.valor);

    if (!numeroDigitado || !Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      alert('Preencha corretamente número e valor da aposta.');
      return;
    }

    const numeroFormatado = this.formatarNumero(numeroDigitado, this.tipoAposta);

    if (!numeroFormatado) {
      alert('Número inválido para o tipo de aposta escolhido.');
      return;
    }

    const payload = {
      tipo_aposta: this.tipoAposta.toUpperCase(),
      palpite: numeroFormatado,
      valor_apostado: valorNumerico
    };

    this.betsService.registrarAposta(payload).subscribe({
      next: (response) => {
        this.numero = '';
        this.valor = null;
        this.ultimoSorteio = [];
        this.mensagemResultado = 'Aposta registrada com sucesso!';
        this.saldo = Number(response.saldo_atual ?? this.saldo);

        this.carregarApostas();
        this.historyService.notificarAtualizacao();
      },
      error: (err) => {
        alert(this.extrairMensagemErro(err, 'Erro ao registrar aposta'));
      }
    });
  }

  removerAposta(id: number): void {
    this.betsService.removerAposta(id).subscribe({
      next: (response) => {
        this.saldo = Number(response?.saldo_atual ?? this.saldo);
        this.mensagemResultado = response?.mensagem ?? 'Aposta removida com sucesso.';
        this.carregarApostas();
        this.historyService.notificarAtualizacao();
      },
      error: (err) => {
        alert(this.extrairMensagemErro(err, 'Erro ao remover aposta'));
      }
    });
  }

  sortear(): void {
    const selecionadas = this.apostasPendentes.filter(aposta => aposta.selecionada);

    if (selecionadas.length === 0) {
      alert('Selecione pelo menos uma aposta.');
      return;
    }

    const apostaIds = selecionadas.map(aposta => aposta.id);

    this.betsService.sortearApostas({ apostaIds }).subscribe({
      next: (response) => {
        this.ultimoSorteio = Array.isArray(response?.ultimo_sorteio)
          ? response.ultimo_sorteio
          : [];

        this.saldo = Number(response?.saldo_atual ?? this.saldo);
        this.mensagemResultado = response?.mensagem || '';

        this.carregarApostas();
        this.historyService.notificarAtualizacao();
      },
      error: (err) => {
        alert(this.extrairMensagemErro(err, 'Erro ao realizar sorteio'));
      }
    });
  }

  carregarApostas(): void {
    this.betsService.listarMinhasApostas().subscribe({
      next: (response) => {
        const lista = Array.isArray(response) ? response : [];

        this.apostas = lista.map((item: any) => ({
          id: Number(item.id),
          tipo: this.converterTipoExibicao(item.tipo_aposta),
          numero: item.palpite,
          valor: Number(item.valor_apostado),
          selecionada: false,
          status: this.converterStatusExibicao(item.status),
          premio: Number(item.premio ?? 0)
        }));

        if (lista.length > 0) {
          this.saldo = Number(lista[0].saldo_atual ?? this.saldo);
        }
      },
      error: (err) => {
        console.error('Erro ao carregar apostas:', err);
      }
    });
  }

  get animalPreview(): Animal | null {
    const numeroFormatado = this.formatarNumero(this.numero, this.tipoAposta);

    if (!numeroFormatado) {
      return null;
    }

    if (this.tipoAposta === 'Grupo') {
      return this.animais.find(animal => animal.grupo === numeroFormatado) || null;
    }

    if (this.tipoAposta === 'Dezena') {
      return this.animais.find(animal => animal.dezenas.includes(numeroFormatado)) || null;
    }

    const dezenaFinal = numeroFormatado.slice(-2);
    return this.animais.find(animal => animal.dezenas.includes(dezenaFinal)) || null;
  }

  get estimativaGanho(): number {
    const valorNumerico = Number(this.valor);

    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      return 0;
    }

    if (this.tipoAposta === 'Grupo') {
      return valorNumerico * 18;
    }

    if (this.tipoAposta === 'Dezena') {
      return valorNumerico * 60;
    }

    return valorNumerico * 400;
  }

  private formatarNumero(numero: string, tipo: TipoAposta): string | null {
    const apenasNumeros = String(numero ?? '').replace(/\D/g, '');

    if (!apenasNumeros) {
      return null;
    }

    if (tipo === 'Grupo') {
      const grupo = Number(apenasNumeros);

      if (!Number.isInteger(grupo) || grupo < 1 || grupo > 25) {
        return null;
      }

      return grupo.toString().padStart(2, '0');
    }

    if (tipo === 'Dezena') {
      if (apenasNumeros.length < 1 || apenasNumeros.length > 2) {
        return null;
      }

      return apenasNumeros.padStart(2, '0');
    }

    if (tipo === 'Milhar') {
      if (apenasNumeros.length < 1 || apenasNumeros.length > 4) {
        return null;
      }

      return apenasNumeros.padStart(4, '0');
    }

    return null;
  }

  private converterTipoExibicao(tipo: string): TipoAposta {
    if (tipo === 'GRUPO') return 'Grupo';
    if (tipo === 'DEZENA') return 'Dezena';
    return 'Milhar';
  }

  private converterStatusExibicao(status: string): StatusApostaExibicao {
    if (status === 'GANHOU') return 'Ganhou';
    if (status === 'PERDEU') return 'Perdeu';
    return 'Aguardando';
  }

  private extrairMensagemErro(err: any, fallback: string): string {
    if (typeof err?.error === 'string' && err.error.trim()) {
      return err.error;
    }

    if (typeof err?.error?.message === 'string' && err.error.message.trim()) {
      return err.error.message;
    }

    if (typeof err?.message === 'string' && err.message.trim()) {
      return err.message;
    }

    return fallback;
  }
}
