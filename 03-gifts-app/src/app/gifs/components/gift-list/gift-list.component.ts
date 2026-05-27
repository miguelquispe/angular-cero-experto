import { Component, Input, input } from '@angular/core';
import { GiftListItemComponent } from './gift-list-item/gift-list-item.component';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gift-list',
  imports: [GiftListItemComponent],
  templateUrl: './gift-list.component.html',
})
export class GiftListComponent {
  // @Input() giftsImages: string[] = [];
  gifts = input.required<Gif[]>();
}
