import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sample-d',
  templateUrl: './sample-d.component.html',
  styleUrls: ['./sample-d.component.scss']
})
export class SampleDComponent {
  @Input() headingId: string;
  @Input() parentHeadingId: string;
}
