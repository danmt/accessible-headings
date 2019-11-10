import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  template: `
    <span
      appHeading
      [headingId]="headingId"
      [parentHeadingId]="parentHeadingId"
      [text]="text"
    ></span>
  `
})
export class HeadingComponent {
  @Input() headingId: string;
  @Input() parentHeadingId: string;
  @Input() text: string;
}
