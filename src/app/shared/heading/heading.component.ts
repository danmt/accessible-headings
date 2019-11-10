import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html'
})
export class HeadingComponent {
  @Input() headingId: string;
  @Input() parentHeadingId: string;
  @Input() text: string;
}
