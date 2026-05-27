import { Component, signal } from '@angular/core';

@Component({
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  name = signal('Ironman');
  age = signal(45);
  getHeroDescription() {
    return `${this.name()} - ${this.age()}`;
  }

  changeHero() {
    this.name.set('Spiderman');
  }

  changeAge() {
    this.age.set(30);
  }

  resetForm() {
    this.name.set('Ironman');
    this.age.set(45);
  }
}
