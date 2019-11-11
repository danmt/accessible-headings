import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  template: `
    <div
      appHeading
      [headingId]="headingId"
      [parentHeadingId]="parentHeadingId"
      [text]="text"
    ></div>
  `
})
export class HeadingComponent {
  @Input() headingId: string;
  @Input() parentHeadingId: string;
  @Input() text: string;
}
