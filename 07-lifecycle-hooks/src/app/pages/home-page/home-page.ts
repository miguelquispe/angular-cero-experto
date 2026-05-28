import {
  afterNextRender,
  afterEveryRender,
  Component,
  effect,
  signal,
} from '@angular/core';

const log = (...messages: string[]) => {
  console.log(
    `${messages[0]} %c${messages.slice(1).join(' ')}`,
    'color: blue; font-weight: bold',
  );
};

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
})
export class HomePage {
  // Forma tradicional antes de la v17 angular - Zone.js
  traditionalProperty = 'Miguel';

  // Forma con signals a partir de la v17 angular - Zone-less
  signalProperty = signal('Miguel');

  constructor() {
    log('HomePage constructor');
  }

  //
  changeTraditional() {
    this.traditionalProperty = 'Miguel Angel Quispe Morocho';
  }

  changeSignal() {
    this.signalProperty.set('Miguel Quispe');
  }

  // Parecido a useEffect y su cleanup
  basicEffect = effect((onCleanup) => {
    log(
      'basicEffect',
      'Ejecutar efectos cada vez que el componente se renderiza, incluso si no hay cambios en los inputs',
    );

    onCleanup(() => {
      log(
        'basicEffect cleanup',
        'Ejecutar limpieza cuando el efecto se va a destruir',
      );
    });
  });

  ngOnInit() {
    log(
      'ngOnInit',
      'Se ejecuta una vez angular ha inicializado el componente y sus inputs',
    );
  }

  ngOnChanges() {
    log(
      'ngOnChanges',
      'Se ejecuta cada vez que hay un cambio en los inputs del componente',
    );
  }

  ngDoCheck() {
    log(
      'ngDoCheck',
      'Se ejecuta cada vez que angular verifica el estado del componente, incluso si no hay cambios en los inputs',
    );
  }

  ngAfterContentInit() {
    log(
      'ngAfterContentInit',
      'Se ejecuta una vez angular ha proyectado el contenido del componente',
    );
  }

  ngAfterContentChecked() {
    log(
      'ngAfterContentChecked',
      'Se ejecuta después de que angular haya verificado el contenido proyectado del componente',
    );
  }

  ngAfterViewInit() {
    log(
      'ngAfterViewInit',
      'Se ejecuta una vez angular ha inicializado las vistas del componente y sus hijos',
    );
  }

  ngAfterViewChecked() {
    log(
      'ngAfterViewChecked',
      'Se ejecuta después de que angular haya verificado las vistas del componente y sus hijos',
    );
  }

  ngOnDestroy() {
    // Se ejecuta justo antes de que angular destruya el componente
    // Limpieza de suscripciones, timers, websockets, etc
    log(
      'ngOnDestroy',
      'Se ejecuta justo antes de que angular destruya el componente',
    );
  }

  afterNextRenderEffect = afterNextRender(() => {
    log(
      'afterNextRenderEffect',
      'Se ejecuta después de que angular haya renderizado todos los componentes el DOM',
    );
  });

  // antes: afterRender
  afterEveryRenderEffect = afterEveryRender(() => {
    log(
      'afterEveryRenderEffect',
      'Se ejecuta después de que angular haya renderizado todos los componentes el DOM',
    );
  });
}
