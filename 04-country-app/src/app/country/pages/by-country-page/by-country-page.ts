import { ChangeDetectionStrategy, Component } from '@angular/core';
import { List } from '../../components/list/list';
import { SearchInput } from '../../components/search-input/search-input';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, List],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {}
