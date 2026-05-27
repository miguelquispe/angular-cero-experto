import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GiftListComponent } from '../../components/gift-list/gift-list.component';

@Component({
  selector: 'app-gift-history',
  imports: [GiftListComponent],
  templateUrl: './gift-history.component.html',
})
export default class GiftHistoryComponent {
  gifService = inject(GifService);
  // Routa activa: activated-route
  // params: es un observable que emite los parametros de la ruta cuando cambian
  // tiene un metodo subscribe para escuchar los cambios
  // query = inject(ActivatedRoute).params.subscribe((params) => {
  //   console.log('params:', params);
  // });

  // Otra forma de manejar los parametros de la ruta es usando signals: angular moderno
  // transforma cualquier observable en una signal
  // con pipe agregamos un map para obtener solo el parametro query
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );

  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  });
}
