import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

// Cargar desde localStorage
const loadHistoryFromLocalStorage = (): Record<string, Gif[]> => {
  const searchHistory = localStorage.getItem('searchHistory');

  return searchHistory ? JSON.parse(searchHistory) : {};
};

@Injectable({ providedIn: 'root' })

// Servicio para manejar GIFs
export class GifService {
  // Inyección del HttpClient
  // para hacer peticiones HTTP
  private http = inject(HttpClient);

  // Signal: sirve para manejar estados reactivamente
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(false);

  private trendingPage = signal<number>(0);

  // Masonry layout
  // [[gif, gif, gif], [gif, gif, gif]]
  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];

    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    // console.log('groups', groups);

    return groups;
  });

  // Historial y cache de búsquedas
  searchHistory = signal<Record<string, Gif[]>>(loadHistoryFromLocalStorage());
  // cada vez que se actualice el searchHistory, se actualizará(computara) searchHistoryKeys
  // computed:
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  // Cada vez que searchHistory cambie, guardamos en localStorage
  // Efectos secundarios y computados
  searchHistoryLocalStorageEffect = effect(() => {
    // console.log('searchHistory', this.searchHistory());
    const history = this.searchHistory();
    localStorage.setItem('searchHistory', JSON.stringify(history));
  });

  constructor() {
    this.loadTrendingGifs();
    // console.log('servicio creado');
  }

  loadTrendingGifs(): void {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          offset: this.trendingPage() * 20,
        },
      })
      .subscribe((response) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
        this.trendingGifs.update((prevGifs) => [...prevGifs, ...gifs]);
        this.trendingPage.update((page) => page + 1);
        this.trendingGifsLoading.set(false);
      });
  }

  searchGifts(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          q: query,
          limit: 20,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

        // Historial
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        }),
      );
    // .subscribe((response) => {
    //   console.log('Search results for query:', response.data);
    // });
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
