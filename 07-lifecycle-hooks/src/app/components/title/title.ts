import { Component, input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.html',
})
export class Title {
  title = input.required<string>();

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges:::TitleComponent');
    for (const inputName in changes) {
      const inputValues = changes[inputName];
      console.log(
        `Previous value of ${inputName}:::>`,
        inputValues.previousValue,
      );
      console.log(
        `Current value of ${inputName}:::>`,
        inputValues.currentValue,
      );
      console.log(
        `Is first change for ${inputName}:::>`,
        inputValues.firstChange,
      );
    }

    // if (changes) {
    //   console.log(`Previous: ${changes.title.previousValue}`);
    //   console.log(`Current: ${changes.title.currentValue}`);
    //   console.log(`Is first ${changes.title.firstChange}`);
    // }
  }
}
