import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'pokemon-detail/:id',
    loadComponent: () => import('./pages/pokemon-detail/pokemon-detail.page').then( m => m.PokemonDetailPage)
  },
  {
    path: 'intro',
    loadComponent: () => import('./pages/intro/intro.page').then( m => m.IntroPage)
  },
  {
    path: 'loadpage',
    loadComponent: () => import('./pages/loadpage/loadpage.page').then( m => m.LoadpagePage)
  },
];
