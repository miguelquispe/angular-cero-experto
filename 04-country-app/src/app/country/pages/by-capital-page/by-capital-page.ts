import { ChangeDetectionStrategy, Component } from '@angular/core';
import { List } from '../../components/list/list';
import { SearchInput } from '../../components/search-input/search-input';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, List],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {}
