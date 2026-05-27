import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from '../../services/gifs.service';

interface MenuOption {
  label: string;
  icon: string;
  route: string;
  sublabel: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
})
export default class SideMenuOptionsComponent {
  // Inyección del servicio GifService
  giftService = inject(GifService);

  // Opciones del menú lateral
  menuOptions: MenuOption[] = [
    {
      label: 'Trending',
      icon: 'fa-solid fa-fire',
      route: '/dashboard/trending',
      sublabel: 'Gifs populares',
    },
    {
      label: 'Buscar',
      icon: 'fa-solid fa-magnifying-glass',
      route: '/dashboard/search',
      sublabel: 'Buscar gifs',
    },
  ];
}
