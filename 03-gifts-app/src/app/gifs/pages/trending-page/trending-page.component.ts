import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
// import { GiftListComponent } from '../../components/gift-list/gift-list.component';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

const imageUrls: string[] = [
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg',
];

@Component({
  selector: 'app-trending-page',
  // imports: [GiftListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  // images = imageUrls;

  giftService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  // #(referencia local) en el HTML: #groupDiv
  // viewChild para tomar la referencia del div con scroll (#groupDiv)
  // Solo selecciona una sola referencia
  scrollDivRef = viewChild<ElementRef>('groupDiv');

  // Después de que la vista se haya inicializado, podemos acceder a la referencia del div con scroll
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  // viewChildren para tomar todas las referencias de los divs internos
  // selecciona multiples referencias
  // groupDivs = viewChildren('groupDivs');

  onScroll(event: Event): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    // Si el usuario ha llegado al final del scroll
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight; // estoy al final del scroll

    // actualizar el estado del scroll en el servicio
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      // cargar más imágenes o datos
      this.giftService.loadTrendingGifs();
    }
  }
}
