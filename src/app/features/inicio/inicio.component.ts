import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  tiposAposta = [
    {
      titulo: 'Grupo',
      descricao: 'Você escolhe um grupo de animal. É uma opção simples e muito popular.'
    },
    {
      titulo: 'Dezena',
      descricao: 'Você aposta em dois números finais. Ideal para quem quer mais precisão.'
    },
    {
      titulo: 'Milhar',
      descricao: 'Você escolhe os quatro números completos. É a modalidade mais direta.'
    }
  ];

  animais = [
    { nome: 'Avestruz', grupo: '01', dezenas: '01, 02, 03, 04', imagem: '/avestruz.png' },
    { nome: 'Águia', grupo: '02', dezenas: '05, 06, 07, 08', imagem: '/aguia.png' },
    { nome: 'Burro', grupo: '03', dezenas: '09, 10, 11, 12', imagem: '/burro.png' },
    { nome: 'Borboleta', grupo: '04', dezenas: '13, 14, 15, 16', imagem: '/borboleta.png' },
    { nome: 'Cachorro', grupo: '05', dezenas: '17, 18, 19, 20', imagem: '/cachorro.png' },
    { nome: 'Cabra', grupo: '06', dezenas: '21, 22, 23, 24', imagem: '/cabra.png' },
    { nome: 'Carneiro', grupo: '07', dezenas: '25, 26, 27, 28', imagem: '/carneiro.png' },
    { nome: 'Camelo', grupo: '08', dezenas: '29, 30, 31, 32', imagem: '/camelo.png' },
    { nome: 'Cobra', grupo: '09', dezenas: '33, 34, 35, 36', imagem: '/cobra.png' },
    { nome: 'Coelho', grupo: '10', dezenas: '37, 38, 39, 40', imagem: '/coelho.png' },
    { nome: 'Cavalo', grupo: '11', dezenas: '41, 42, 43, 44', imagem: '/cavalo.png' },
    { nome: 'Elefante', grupo: '12', dezenas: '45, 46, 47, 48', imagem: '/elefante.png' },
    { nome: 'Galo', grupo: '13', dezenas: '49, 50, 51, 52', imagem: '/galo.png' },
    { nome: 'Gato', grupo: '14', dezenas: '53, 54, 55, 56', imagem: '/gato.png' },
    { nome: 'Jacaré', grupo: '15', dezenas: '57, 58, 59, 60', imagem: '/jacare.png' },
    { nome: 'Leão', grupo: '16', dezenas: '61, 62, 63, 64', imagem: '/leao.png' },
    { nome: 'Macaco', grupo: '17', dezenas: '65, 66, 67, 68', imagem: '/macaco.png' },
    { nome: 'Porco', grupo: '18', dezenas: '69, 70, 71, 72', imagem: '/porco.png' },
    { nome: 'Pavão', grupo: '19', dezenas: '73, 74, 75, 76', imagem: '/pavao.png' },
    { nome: 'Peru', grupo: '20', dezenas: '77, 78, 79, 80', imagem: '/peru.png' },
    { nome: 'Touro', grupo: '21', dezenas: '81, 82, 83, 84', imagem: '/touro.png' },
    { nome: 'Tigre', grupo: '22', dezenas: '85, 86, 87, 88', imagem: '/tigre.png' },
    { nome: 'Urso', grupo: '23', dezenas: '89, 90, 91, 92', imagem: '/urso.png' },
    { nome: 'Veado', grupo: '24', dezenas: '93, 94, 95, 96', imagem: '/veado.png' },
    { nome: 'Vaca', grupo: '25', dezenas: '97, 98, 99, 00', imagem: '/vaca.png' }
  ];
}