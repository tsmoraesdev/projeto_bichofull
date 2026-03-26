import { Routes } from '@angular/router';
import { AuthPageComponent } from './features/auth/auth-page/auth-page.component';
import { InicioComponent } from './features/inicio/inicio.component';
import { BetsComponent } from './features/bets/bets.component';
import { ResultsComponent } from './features/results/results.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AppLayoutComponent } from './shared/app-layout/app-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'bets', component: BetsComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];