import { Routes } from '@angular/router';
import { CounterPageComponent } from './counter/counter-page.component';
import { HeroComponent } from './hero/hero.component';
import { DragonPageComponent } from './pages/dragonball/dragon-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CounterPageComponent,
  },
  {
    path: 'hero',
    component: HeroComponent,
  },
  {
    path: 'dragonball',
    component: DragonPageComponent,
  },
];
