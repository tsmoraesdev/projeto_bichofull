import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  ultimoSorteio = {
    data: '12/03/2026',
    premios: ['1834', '4521', '7788', '9012', '3345']
  };

  historicoResultados = [
    {
      data: '11/03/2026',
      premios: ['1122', '3344', '5566', '7788', '9900']
    },
    {
      data: '10/03/2026',
      premios: ['1456', '2389', '4501', '6723', '8899']
    },
    {
      data: '09/03/2026',
      premios: ['1020', '3040', '5060', '7080', '9000']
    }
  ];
}