import { Component, signal } from '@angular/core';

interface Personaje {
  name: string;
  power: number;
  id: number;
}

@Component({
  templateUrl: './dragon-page.component.html',
})
export class DragonPageComponent {
  protected title = 'Dragon Page';

  name = signal('Gohan');
  power = signal(9001);

  characters = signal<Personaje[]>([
    {
      name: 'Goku',
      power: 9001,
      id: 1,
    },
    {
      name: 'Vegeta',
      power: 1000,
      id: 2,
    },
    {
      name: 'Gohan',
      power: 5000,
      id: 3,
    },
    {
      name: 'yamcha',
      power: 100,
      id: 4,
    },
  ]);
}
