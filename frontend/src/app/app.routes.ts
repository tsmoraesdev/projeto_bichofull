import { Routes } from '@angular/router';
import { AuthPageComponent } from './features/auth/auth-page/auth-page.component';
import { InicioComponent } from './features/inicio/inicio.component';
import { BetsComponent } from './features/bets/bets.component';
import { ResultsComponent } from './features/results/results.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AppLayoutComponent } from './shared/app-layout/app-layout.component';
import { AuthGuard } from './core/services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  { path: 'auth', component: AuthPageComponent },

  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
      { path: 'bets', component: BetsComponent, canActivate: [AuthGuard] },
      { path: 'results', component: ResultsComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
    ]
  },

  { path: '**', redirectTo: 'auth' }
];
