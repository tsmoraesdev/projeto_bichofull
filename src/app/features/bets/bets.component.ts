import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TipoAposta = 'Grupo' | 'Dezena' | 'Milhar';

interface Aposta {
  id: number;
  tipo: TipoAposta;
  numero: string;
  valor: number;
  selecionada: boolean;
  status: 'Aguardando' | 'Ganhou' | 'Perdeu';
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
  styleUrl: './bets.component.scss'
})
export class BetsComponent {
  saldo = 1000;

  tipoAposta: TipoAposta = 'Grupo';
  numero = '';
  valor = 0;

  proximoId = 1;

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

  adicionarDinheiro() {
    this.saldo += 100;
    alert('R$ 100,00 adicionados ao saldo.');
  }

  registrarAposta() {
    if (!this.numero.trim() || this.valor <= 0) {
      alert('Preencha corretamente número e valor da aposta.');
      return;
    }

    if (this.valor > this.saldo) {
      alert('Saldo insuficiente para registrar essa aposta.');
      return;
    }

    const numeroFormatado = this.formatarNumero(this.numero, this.tipoAposta);

    if (!numeroFormatado) {
      alert('Número inválido para o tipo de aposta escolhido.');
      return;
    }

    this.apostas.unshift({
      id: this.proximoId++,
      tipo: this.tipoAposta,
      numero: numeroFormatado,
      valor: this.valor,
      selecionada: false,
      status: 'Aguardando',
      premio: 0
    });

    this.numero = '';
    this.valor = 0;
  }

  removerAposta(id: number) {
    this.apostas = this.apostas.filter(aposta => aposta.id !== id);
  }

  sortear() {
    const selecionadas = this.apostas.filter(aposta => aposta.selecionada);

    if (selecionadas.length === 0) {
      alert('Selecione pelo menos uma aposta para realizar o sorteio.');
      return;
    }

    const valorTotal = selecionadas.reduce((total, aposta) => total + aposta.valor, 0);

    if (valorTotal > this.saldo) {
      alert('Saldo insuficiente para realizar o sorteio dessas apostas.');
      return;
    }

    this.saldo -= valorTotal;
    this.ultimoSorteio = this.gerarSorteio();

    let totalPremio = 0;
    let ganhouAlguma = false;

    this.apostas = this.apostas.map(aposta => {
      if (!aposta.selecionada) return aposta;

      const ganhou = this.verificarResultado(aposta);
      const premio = ganhou ? this.calcularPremio(aposta) : 0;

      if (ganhou) {
        ganhouAlguma = true;
        totalPremio += premio;
      }

      return {
        ...aposta,
        status: ganhou ? 'Ganhou' : 'Perdeu',
        premio,
        selecionada: false
      };
    });

    this.saldo += totalPremio;

    if (ganhouAlguma) {
      this.mensagemResultado = `Parabéns! Você ganhou R$ ${totalPremio.toFixed(2)}.`;
    } else {
      this.mensagemResultado = 'Nenhuma aposta foi premiada neste sorteio.';
    }
  }

  get animalPreview(): Animal | null {
    const numeroFormatado = this.formatarNumero(this.numero, this.tipoAposta);
    if (!numeroFormatado) return null;

    if (this.tipoAposta === 'Grupo') {
      return this.animais.find(animal => animal.grupo === numeroFormatado) || null;
    }

    if (this.tipoAposta === 'Dezena') {
      return this.animais.find(animal => animal.dezenas.includes(numeroFormatado)) || null;
    }

    if (this.tipoAposta === 'Milhar') {
      const dezenaFinal = numeroFormatado.slice(-2);
      return this.animais.find(animal => animal.dezenas.includes(dezenaFinal)) || null;
    }

    return null;
  }

  get estimativaGanho(): number {
    if (this.valor <= 0) return 0;

    if (this.tipoAposta === 'Grupo') return this.valor * 18;
    if (this.tipoAposta === 'Dezena') return this.valor * 60;
    return this.valor * 400;
  }

  private gerarSorteio(): string[] {
    const premios: string[] = [];

    for (let i = 0; i < 5; i++) {
      const numero = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0');
      premios.push(numero);
    }

    return premios;
  }

  private verificarResultado(aposta: Aposta): boolean {
    const primeiroPremio = this.ultimoSorteio[0];

    if (aposta.tipo === 'Milhar') {
      return primeiroPremio === aposta.numero;
    }

    if (aposta.tipo === 'Dezena') {
      return primeiroPremio.slice(-2) === aposta.numero;
    }

    if (aposta.tipo === 'Grupo') {
      const dezena = Number(primeiroPremio.slice(-2));
      const grupoSorteado = dezena === 0 ? 25 : Math.ceil(dezena / 4);
      return grupoSorteado === Number(aposta.numero);
    }

    return false;
  }

  private calcularPremio(aposta: Aposta): number {
    if (aposta.tipo === 'Grupo') return aposta.valor * 18;
    if (aposta.tipo === 'Dezena') return aposta.valor * 60;
    return aposta.valor * 400;
  }

  private formatarNumero(numero: string, tipo: TipoAposta): string | null {
    const apenasNumeros = numero.replace(/\D/g, '');

    if (tipo === 'Grupo') {
      const grupo = Number(apenasNumeros);
      if (grupo < 1 || grupo > 25) return null;
      return grupo.toString().padStart(2, '0');
    }

    if (tipo === 'Dezena') {
      if (apenasNumeros.length < 1 || apenasNumeros.length > 2) return null;
      return apenasNumeros.padStart(2, '0');
    }

    if (tipo === 'Milhar') {
      if (apenasNumeros.length < 1 || apenasNumeros.length > 4) return null;
      return apenasNumeros.padStart(4, '0');
    }

    return null;
  }
}