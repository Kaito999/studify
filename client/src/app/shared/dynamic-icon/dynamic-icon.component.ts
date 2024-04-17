import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-letter-icon',
  template: ` <div class="letter-icon">{{ firstLetter }}</div> `,
  styles: [
    `
      .letter-icon {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: black;
        color: white;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class DynamicIconComponent {
  @Input() title: string = '';

  get firstLetter(): string {
    return this.title.charAt(0).toUpperCase();
  }
}
