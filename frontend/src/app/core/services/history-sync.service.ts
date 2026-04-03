import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorySyncService {
  private readonly atualizacaoHistoricoSubject = new Subject<void>();
  readonly atualizacaoHistorico$ = this.atualizacaoHistoricoSubject.asObservable();

  notificarAtualizacao(): void {
    this.atualizacaoHistoricoSubject.next();
  }
}
