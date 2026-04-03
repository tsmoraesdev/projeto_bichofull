import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent implements OnInit {
  modalPerfilAberto = false;

  usuario = {
    nome: 'Usuário',
    email: '',
    saldo: 0
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.carregarUsuario();
  }

  abrirModalPerfil() {
    this.modalPerfilAberto = true;
  }

  fecharModalPerfil() {
    this.modalPerfilAberto = false;
  }

  logout() {
    this.fecharModalPerfil();
    this.authService.logout();
    this.router.navigate(['/auth']);
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
}
